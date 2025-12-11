import { Resend } from 'resend';

// Allow build without RESEND_API_KEY - will fail at runtime if emails are sent
const apiKey = process.env.RESEND_API_KEY || 're_dummy_key_for_build';

export const resend = new Resend(apiKey);

export const sendWelcomeEmail = async (to: string, name: string) => {
  try {
    await resend.emails.send({
      from: 'Upepo Soul <noreply@upeposoul.com>',
      to,
      subject: 'Welcome to Upepo Soul ✨',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #D9B24C;">Welcome to Upepo Soul, ${name}!</h1>
          <p>We're thrilled to have you join our community of seekers, healers, and soul explorers.</p>
          <p>Your journey toward deeper presence and authentic living begins here.</p>
          <h2 style="color: #B78CE2;">What's Next?</h2>
          <ul>
            <li>Explore our Soul Notes for daily inspiration</li>
            <li>Try our Guided Practices for meditation and breathwork</li>
            <li>Book a Soul Session for personalized guidance</li>
            <li>Join our community forum to connect with others</li>
          </ul>
          <p>With love and light,<br/>The Upepo Soul Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

export const sendBookingConfirmation = async (
  to: string,
  name: string,
  sessionTitle: string,
  sessionDate: Date
) => {
  try {
    await resend.emails.send({
      from: 'Upepo Soul <noreply@upeposoul.com>',
      to,
      subject: `Booking Confirmed: ${sessionTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #E7C1CC;">Your Soul Session is Confirmed!</h1>
          <p>Hi ${name},</p>
          <p>Your booking for <strong>${sessionTitle}</strong> has been confirmed.</p>
          <div style="background: #F7F7FB; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #B78CE2; margin-top: 0;">Session Details</h3>
            <p><strong>Session:</strong> ${sessionTitle}</p>
            <p><strong>Date:</strong> ${sessionDate.toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${sessionDate.toLocaleTimeString()}</p>
          </div>
          <p>We look forward to holding space with you.</p>
          <p>With love,<br/>The Upepo Soul Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Error sending booking confirmation:', error);
  }
};

export const sendPasswordResetEmail = async (to: string, resetToken: string) => {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;
  
  try {
    await resend.emails.send({
      from: 'Upepo Soul <noreply@upeposoul.com>',
      to,
      subject: 'Reset Your Password',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #D9B24C;">Reset Your Password</h1>
          <p>You requested to reset your password. Click the button below to create a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background: linear-gradient(to right, #D9B24C, #B78CE2); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, you can safely ignore this email.</p>
          <p>With care,<br/>The Upepo Soul Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};
