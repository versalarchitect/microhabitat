import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

// MyUrbanFarm Supabase client to fetch sales team
const supabase = createClient(
  process.env.MYURBANFARM_SUPABASE_URL || '',
  process.env.MYURBANFARM_SUPABASE_ANON_KEY || ''
);

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

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

    // Get sales team emails from MyUrbanFarm database
    let salesTeamEmails: string[] = [];
    try {
      const { data: salesUsers } = await supabase
        .from('users')
        .select('email')
        .eq('role', 'sales');

      if (salesUsers && salesUsers.length > 0) {
        salesTeamEmails = salesUsers.map((u: { email: string }) => u.email).filter(Boolean);
      }
    } catch (err) {
      console.log('Could not fetch sales team from database, using fallback:', err);
    }

    // Always include Gabriel and add sales team
    const recipients = [
      'gabriel@microhabitat.ca',
      ...salesTeamEmails
    ].filter((email, index, arr) => arr.indexOf(email) === index); // Remove duplicates

    // Format the email
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/Montreal',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f9fafb;">
  <div style="background: linear-gradient(135deg, #5a7d5a 0%, #4a6d4a 100%); color: white; padding: 24px; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; font-size: 22px;">New Website Inquiry</h1>
    <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">From MicroHabitat Website Chat</p>
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
      <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 14px;">Message:</p>
      <div style="background: #f9fafb; padding: 16px; border-radius: 6px; border-left: 4px solid #5a7d5a;">
        <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${body.message}</p>
      </div>
    </div>

    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f3f4f6;">
      <a href="mailto:${body.email}?subject=Re: Your inquiry to MicroHabitat" style="display: inline-block; background: #5a7d5a; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500;">Reply to ${body.name}</a>
    </div>

    <p style="margin-top: 24px; color: #9ca3af; font-size: 12px;">
      Received on ${timestamp}
    </p>
  </div>
</body>
</html>`;

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'MicroHabitat <team@microhabitat.com>',
      to: recipients,
      replyTo: body.email,
      subject: `New inquiry from ${body.name}${body.company ? ` (${body.company})` : ''}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent. A representative will contact you shortly.',
      id: data?.id
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
