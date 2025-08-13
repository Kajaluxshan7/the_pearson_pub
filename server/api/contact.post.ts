import { readBody, createError } from "h3";
import type { H3Event } from "h3";
import nodemailer from "nodemailer";

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody(event);
    const { firstName, lastName, email, message, subject } = body;

    // Get runtime config
    const config = useRuntimeConfig();

    // Validate required fields
    if (!firstName || !lastName || !email || !message || !subject) {
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
      host: config.smtpHost || process.env.NUXT_SMTP_HOST || "smtp.gmail.com",
      port: parseInt(config.smtpPort || process.env.NUXT_SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports like 587
      auth: {
        user: config.smtpUser || process.env.NUXT_SMTP_USER,
        pass: config.smtpPass || process.env.NUXT_SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Prepare email content with modern template
    const mailOptions = {
      from: `"${firstName} ${lastName}" <${
        config.smtpUser || process.env.NUXT_SMTP_USER
      }>`,
      replyTo: email,
      to:
        config.contactEmail ||
        process.env.NUXT_CONTACT_EMAIL ||
        "contact@thepearsonpub.ca",
      subject: `🍺 New Contact Form Submission - The Pearson Pub | ${subject}`,
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Form Submission</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #374151;
              background: #f3f4f6;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
              padding: 30px;
              text-align: center;
              color: white;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .logo .accent {
              color: #fbbf24;
            }
            .tagline {
              color: #fbbf24;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .content {
              padding: 30px;
            }
            .message-header {
              text-align: center;
              margin-bottom: 30px;
            }
            .message-title {
              font-size: 24px;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 10px;
            }
            .message-subtitle {
              color: #6b7280;
              font-size: 16px;
            }
            .message-details {
              background: #f9fafb;
              border-radius: 12px;
              padding: 25px;
              margin-bottom: 20px;
              border-left: 4px solid #fbbf24;
            }
            .info-row {
              display: flex;
              margin-bottom: 15px;
            }
            .info-label {
              font-weight: bold;
              color: #1f2937;
              width: 80px;
              flex-shrink: 0;
            }
            .info-value {
              color: #374151;
              flex: 1;
            }
            .message-content {
              background: white;
              padding: 20px;
              border-radius: 8px;
              border: 1px solid #e5e7eb;
              margin-top: 15px;
            }
            .footer {
              background: #f9fafb;
              padding: 20px 30px;
              text-align: center;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 14px;
            }
            .timestamp {
              margin-top: 10px;
              font-size: 12px;
              color: #9ca3af;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">The <span class="accent">Pearson</span> Pub</div>
              <div class="tagline">Contact Form Submission</div>
            </div>
            
            <div class="content">
              <div class="message-header">
                <h1 class="message-title">New Message Received</h1>
                <p class="message-subtitle">A customer has sent you a message through your website</p>
              </div>
              
              <div class="message-details">
                <div class="info-row">
                  <div class="info-label">Name:</div>
                  <div class="info-value">${firstName} ${lastName}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Email:</div>
                  <div class="info-value">${email}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Subject:</div>
                  <div class="info-value">${subject}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Message:</div>
                </div>
                <div class="message-content">
                  ${message.replace(/\n/g, "<br>")}
                </div>
              </div>
            </div>
            
            <div class="footer">
              <p>This message was sent via the contact form on The Pearson Pub website.</p>
              <div class="timestamp">
                Received on ${new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Log configuration for debugging (without sensitive data)
    console.log("Email configuration:", {
      host: config.smtpHost || process.env.NUXT_SMTP_HOST || "smtp.gmail.com",
      port: parseInt(config.smtpPort || process.env.NUXT_SMTP_PORT || "587"),
      user:
        config.smtpUser || process.env.NUXT_SMTP_USER
          ? "***configured***"
          : "NOT SET",
      pass:
        config.smtpPass || process.env.NUXT_SMTP_PASS
          ? "***configured***"
          : "NOT SET",
      contactEmail:
        config.contactEmail ||
        process.env.NUXT_CONTACT_EMAIL ||
        "contact@thepearsonpub.ca",
    });

    // Verify transporter configuration
    try {
      await transport.verify();
      console.log("✅ SMTP connection verified successfully");
    } catch (verifyError: any) {
  console.error("❌ SMTP verification failed:", verifyError);
      throw createError({
        statusCode: 500,
        message:
          "Email service configuration error. Please check your SMTP settings.",
      });
    }

    // Send email
    try {
      const result = await transport.sendMail(mailOptions);
      console.log("✅ Email sent successfully:", result.messageId);

      return {
        success: true,
        message: "Message sent successfully",
        messageId: result.messageId,
      };
    } catch (sendError: any) {
      console.error("❌ Failed to send email:", sendError.message);
      throw createError({
        statusCode: 500,
        message: "Failed to send email. Please try again later.",
      });
    }
  } catch (error: any) {
    console.error("Contact form error:", error);

    // Return appropriate error based on the type
    const statusCode = error.statusCode || 500;
    const message =
      error.message || "An error occurred while sending the message";

    throw createError({
      statusCode,
      message,
    });
  }
});
