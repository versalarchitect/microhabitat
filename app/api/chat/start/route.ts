import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createWebsiteChat, sendWebsiteChatMessage, getSalesTeamEmails } from '@/lib/chat/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);
const MUF_BASE_URL = process.env.MYURBANFARM_URL || 'https://www.myurbanfarm.ai';

interface StartChatRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source_url?: string;
  locale?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: StartChatRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Create the chat session
    const { chat, error: chatError } = await createWebsiteChat({
      visitor_name: body.name,
      visitor_email: body.email,
      visitor_phone: body.phone,
      visitor_company: body.company,
      source_url: body.source_url,
      source_locale: body.locale || 'en',
    });

    if (chatError || !chat) {
      console.error('Failed to create chat:', chatError);
      return NextResponse.json(
        { error: 'Failed to start chat. Please try again.' },
        { status: 500 }
      );
    }

    // Send the initial message
    const { error: messageError } = await sendWebsiteChatMessage({
      chat_id: chat.id,
      session_token: chat.session_token,
      content: body.message,
      sender_type: 'visitor',
      sender_name: body.name,
    });

    if (messageError) {
      console.error('Failed to send initial message:', messageError);
    }

    // Get sales team emails
    const salesEmails = await getSalesTeamEmails();
    const recipients = [
      'gabriel@microhabitat.ca',
      'charles@microhabitat.ca',
      ...salesEmails
    ].filter((email, index, arr) => arr.indexOf(email) === index);

    // Format timestamp
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/Montreal',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Create the link to MUF website chats
    const chatUrl = `${MUF_BASE_URL}/admin/website-chats/${chat.id}`;

    // Send email notification
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f9fafb;">
  <div style="background: linear-gradient(135deg, #5a7d5a 0%, #4a6d4a 100%); color: white; padding: 24px; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; font-size: 22px;">New Website Chat</h1>
    <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">A visitor wants to speak with you</p>
  </div>

  <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px; background: white;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; width: 100px;">Name</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 500;">${body.name}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Email</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
          <a href="mailto:${body.email}" style="color: #5a7d5a; text-decoration: none;">${body.email}</a>
        </td>
      </tr>
      ${body.phone ? `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Phone</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
          <a href="tel:${body.phone}" style="color: #5a7d5a; text-decoration: none;">${body.phone}</a>
        </td>
      </tr>
      ` : ''}
      ${body.company ? `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Company</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">${body.company}</td>
      </tr>
      ` : ''}
    </table>

    <div style="margin-top: 20px;">
      <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 14px;">Initial Message:</p>
      <div style="background: #f9fafb; padding: 16px; border-radius: 6px; border-left: 4px solid #5a7d5a;">
        <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${body.message}</p>
      </div>
    </div>

    <div style="margin-top: 24px; text-align: center;">
      <a href="${chatUrl}" style="display: inline-block; background: #5a7d5a; color: white; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px;">
        Reply in MyUrbanFarm
      </a>
    </div>

    <p style="margin-top: 16px; text-align: center; color: #6b7280; font-size: 13px;">
      Your response will appear in the visitor's chat widget on the website.
    </p>

    <p style="margin-top: 24px; color: #9ca3af; font-size: 12px; border-top: 1px solid #f3f4f6; padding-top: 16px;">
      Received on ${timestamp} from microhabitat.com
    </p>
  </div>
</body>
</html>`;

    // Send email
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'MicroHabitat <team@microhabitat.com>',
      to: recipients,
      replyTo: body.email,
      subject: `New chat from ${body.name}${body.company ? ` (${body.company})` : ''} - MicroHabitat`,
      html: emailHtml,
    });

    // Return the chat session info for the client
    return NextResponse.json({
      success: true,
      chat_id: chat.id,
      session_token: chat.session_token,
      message: 'Chat started successfully. A representative will respond shortly.',
    });
  } catch (err) {
    console.error('Start chat error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
