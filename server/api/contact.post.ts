// server/api/contact.post.ts
import nodemailer from "nodemailer";
import { EventHandlerRequest, H3Event } from "h3";

export default async (event: H3Event) => {
  const body = await useBody(event);
  const { name, email, message } = body;

  // Configure your SMTP transport settings.
  // It's best to use environment variables to store sensitive info.
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g., 'smtp.example.com'
    port: Number(process.env.SMTP_PORT || 465),
    secure: true, // true for port 465, false for others
    auth: {
      user: process.env.SMTP_USER, // SMTP username
      pass: process.env.SMTP_PASS, // SMTP password
    },
  });

  try {
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL, // Where you want to receive emails
      subject: "New Message from Contact Form",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    });

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send email" };
  }
};
import { readBody } from "h3";

function useBody(event: H3Event<EventHandlerRequest>) {
    return readBody(event);
}

