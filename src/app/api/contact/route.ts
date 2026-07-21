import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, recipientEmail } = await req.json();

    if (!recipientEmail) {
      return NextResponse.json(
        { error: 'Recipient email is missing' },
        { status: 400 }
      );
    }

    // In a Vercel serverless environment, we cannot use local sendmail.
    // Instead, we must connect to an external SMTP server (e.g., Gmail, Outlook, AWS SES).
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true' || false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER || email}>`,
      replyTo: email,
      to: recipientEmail,
      subject: `Contact Form: ${subject}`,
      text: `You have received a new message from the contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Check your SMTP configuration in environment variables.' },
      { status: 500 }
    );
  }
}
