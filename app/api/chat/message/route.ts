import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { sendWebsiteChatMessage, getWebsiteChat, getSalesTeamEmails } from '@/lib/chat/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);
const MUF_BASE_URL = process.env.MYURBANFARM_URL || 'https://www.myurbanfarm.ai';

interface SendMessageRequest {
  chat_id: string;
  session_token: string;
  content: string;
  sender_name?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SendMessageRequest = await request.json();

    // Validate required fields
    if (!body.chat_id || !body.session_token || !body.content) {
      return NextResponse.json(
        { error: 'chat_id, session_token, and content are required' },
        { status: 400 }
      );
    }

    // Get chat details for email
    const { chat } = await getWebsiteChat(body.chat_id, body.session_token);
    if (!chat) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 400 }
      );
    }

    // Send the message
    const { message, error } = await sendWebsiteChatMessage({
      chat_id: body.chat_id,
      session_token: body.session_token,
      content: body.content.trim(),
      sender_type: 'visitor',
      sender_name: body.sender_name,
    });

    if (error) {
      return NextResponse.json(
        { error: error },
        { status: 400 }
      );
    }

    // Send email notification
    const salesEmails = await getSalesTeamEmails();
    const recipients = [
      'gabriel@microhabitat.ca',
      'charles@microhabitat.ca',
      ...salesEmails
    ].filter((email, index, arr) => arr.indexOf(email) === index);

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/Montreal',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const chatUrl = `${MUF_BASE_URL}/admin/website-chats/${chat.id}`;

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f9fafb;">
  <div style="background: linear-gradient(135deg, #5a7d5a 0%, #4a6d4a 100%); color: white; padding: 24px; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; font-size: 22px;">New Message from ${chat.visitor_name}</h1>
    <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">Reply in MyUrbanFarm</p>
  </div>

  <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px; background: white;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; width: 100px;">From</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 500;">${chat.visitor_name}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Email</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
          <a href="mailto:${chat.visitor_email}" style="color: #5a7d5a; text-decoration: none;">${chat.visitor_email}</a>
        </td>
      </tr>
      ${chat.visitor_company ? `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Company</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">${chat.visitor_company}</td>
      </tr>
      ` : ''}
    </table>

    <div style="margin-top: 20px;">
      <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 14px;">Message:</p>
      <div style="background: #f9fafb; padding: 16px; border-radius: 6px; border-left: 4px solid #5a7d5a;">
        <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${body.content.trim()}</p>
      </div>
    </div>

    <div style="margin-top: 24px; text-align: center;">
      <a href="${chatUrl}" style="display: inline-block; background: #5a7d5a; color: white; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px;">
        Reply in MyUrbanFarm
      </a>
    </div>

    <p style="margin-top: 24px; color: #9ca3af; font-size: 12px; border-top: 1px solid #f3f4f6; padding-top: 16px;">
      Received on ${timestamp} from microhabitat.com
    </p>
  </div>
</body>
</html>`;

    // Send email (don't block on failure)
    resend.emails.send({
      from: process.env.EMAIL_FROM || 'MicroHabitat <team@microhabitat.com>',
      to: recipients,
      replyTo: chat.visitor_email,
      subject: `New message from ${chat.visitor_name}${chat.visitor_company ? ` (${chat.visitor_company})` : ''} - MicroHabitat`,
      html: emailHtml,
    }).catch(err => console.error('Failed to send email notification:', err));

    return NextResponse.json({
      success: true,
      message,
    });
  } catch (err) {
    console.error('Send message error:', err);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
