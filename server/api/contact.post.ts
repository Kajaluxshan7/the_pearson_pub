import { readBody, createError } from "h3";
import type { H3Event } from "h3";
import nodemailer from "nodemailer";

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody(event);
    const { firstName, lastName, email, message } = body;

    // Get runtime config
    const config = useRuntimeConfig();

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      throw createError({
        statusCode: 400,
        message: "All fields are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        message: "Invalid email format",
      });
    }

    // Create mail transporter using environment variables
    const transport = nodemailer.createTransport({
      host: config.smtpHost || "smtp.ethereal.email",
      port: Number(config.smtpPort) || 587,
      auth: {
        user: config.smtpUser || "ethereal.user@ethereal.email",
        pass: config.smtpPass || "ethereal.pass",
      },
    });

    // Prepare email content
    const mailOptions = {
      from: `"${firstName} ${lastName}" <${email}>`,
      to: config.contactEmail || "contact@pearsonpub.com",
      subject: "New Contact Form Submission - The Pearson Pub",
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Send email
    await transport.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: {
        success: true,
        message: "Message sent successfully",
      },
    };
  } catch (error: any) {
    console.error("Contact form error:", error);

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "An error occurred while sending the message",
    });
  }
});
