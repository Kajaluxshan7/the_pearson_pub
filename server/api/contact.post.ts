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
      service: 'gmail',
      secure: true,
      auth: {
        user: config.smtpUser || process.env.NUXT_SMTP_USER,
        pass: config.smtpPass || process.env.NUXT_SMTP_PASS,
      },
    });

    // Prepare email content with modern template
    const mailOptions = {
      from: `"${firstName} ${lastName}" <${email}>`,
      to: config.contactEmail || process.env.NUXT_CONTACT_EMAIL || "contact@pearsonpub.com",
      subject: "🍺 New Contact Form Submission - The Pearson Pub",
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
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
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Cinzel:wght@600&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Inter', sans-serif;
              line-height: 1.6;
              color: #374151;
              background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
              padding: 20px;
            }
            
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            }
            
            .header {
              background: linear-gradient(135deg, #1f2937 0%, #111827 50%, #000000 100%);
              padding: 40px 30px;
              text-align: center;
              position: relative;
              overflow: hidden;
            }
            
            .header::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%);
              animation: pulse 4s ease-in-out infinite;
            }
            
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 0.1; }
              50% { transform: scale(1.1); opacity: 0.2; }
            }
            
            .logo {
              font-family: 'Cinzel', serif;
              font-size: 32px;
              font-weight: 600;
              color: #ffffff;
              margin-bottom: 10px;
              position: relative;
              z-index: 2;
            }
            
            .logo .accent {
              color: #fbbf24;
            }
            
            .tagline {
              color: #fbbf24;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 2px;
              font-weight: 500;
              position: relative;
              z-index: 2;
            }
            
            .divider {
              width: 60px;
              height: 3px;
              background: linear-gradient(90deg, #fbbf24, #f59e0b);
              margin: 15px auto;
              border-radius: 2px;
              position: relative;
              z-index: 2;
            }
            
            .content {
              padding: 40px 30px;
            }
            
            .title {
              font-size: 24px;
              font-weight: 700;
              color: #1f2937;
              margin-bottom: 8px;
              text-align: center;
            }
            
            .subtitle {
              font-size: 16px;
              color: #6b7280;
              text-align: center;
              margin-bottom: 30px;
            }
            
            .info-card {
              background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
              border-radius: 16px;
              padding: 25px;
              margin-bottom: 25px;
              border-left: 4px solid #fbbf24;
              position: relative;
              overflow: hidden;
            }
            
            .info-card::before {
              content: '';
              position: absolute;
              top: 0;
              right: 0;
              width: 100px;
              height: 100px;
              background: radial-gradient(circle, rgba(251, 191, 36, 0.05) 0%, transparent 70%);
              border-radius: 50%;
              transform: translate(30px, -30px);
            }
            
            .info-row {
              display: flex;
              align-items: center;
              margin-bottom: 15px;
              position: relative;
              z-index: 2;
            }
            
            .info-row:last-child {
              margin-bottom: 0;
            }
            
            .info-label {
              font-weight: 600;
              color: #374151;
              min-width: 80px;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .info-value {
              color: #1f2937;
              font-weight: 500;
              flex: 1;
            }
            
            .info-value.email {
              color: #fbbf24;
              text-decoration: none;
            }
            
            .message-card {
              background: linear-gradient(135deg, #fefce8 0%, #fef3c7 100%);
              border-radius: 16px;
              padding: 25px;
              border-left: 4px solid #f59e0b;
              position: relative;
              overflow: hidden;
            }
            
            .message-card::before {
              content: '💬';
              position: absolute;
              top: 15px;
              right: 15px;
              font-size: 24px;
              opacity: 0.3;
            }
            
            .message-label {
              font-weight: 600;
              color: #92400e;
              margin-bottom: 12px;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .message-content {
              color: #1f2937;
              line-height: 1.7;
              font-size: 15px;
              white-space: pre-wrap;
              position: relative;
              z-index: 2;
            }
            
            .footer {
              background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
              padding: 30px;
              text-align: center;
              border-top: 1px solid #e5e7eb;
            }
            
            .footer-text {
              color: #6b7280;
              font-size: 14px;
              margin-bottom: 15px;
            }
            
            .brand-badge {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
              color: white;
              padding: 8px 16px;
              border-radius: 25px;
              font-size: 12px;
              font-weight: 500;
              text-decoration: none;
            }
            
            .brand-badge::before {
              content: '🍺';
              font-size: 14px;
            }
            
            .timestamp {
              background: #f3f4f6;
              color: #6b7280;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 12px;
              margin-top: 15px;
              display: inline-block;
            }
            
            @media (max-width: 600px) {
              .email-container {
                margin: 10px;
                border-radius: 15px;
              }
              
              .header, .content, .footer {
                padding: 25px 20px;
              }
              
              .logo {
                font-size: 24px;
              }
              
              .title {
                font-size: 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <header class="header">
              <div class="logo">The Pearson <span class="accent">Pub</span></div>
              <div class="tagline">Traditional Pub • Modern Experience</div>
              <div class="divider"></div>
            </header>
            
            <div class="content">
              <h1 class="title">New Contact Form Submission</h1>
              <p class="subtitle">Someone has reached out to The Pearson Pub</p>
              
              <div class="info-card">
                <div class="info-row">
                  <span class="info-label">Name:</span>
                  <span class="info-value">${firstName} ${lastName}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Email:</span>
                  <a href="mailto:${email}" class="info-value email">${email}</a>
                </div>
                <div class="info-row">
                  <span class="info-label">Received:</span>
                  <span class="info-value">${new Date().toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'America/Toronto'
                  })}</span>
                </div>
              </div>
              
              <div class="message-card">
                <div class="message-label">Message:</div>
                <div class="message-content">${message.replace(/\n/g, "<br>")}</div>
              </div>
            </div>
            
            <footer class="footer">
              <p class="footer-text">This message was sent via the contact form on The Pearson Pub website.</p>
              <a href="#" class="brand-badge">The Pearson Pub</a>
              <div class="timestamp">
                Email sent on ${new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </footer>
          </div>
        </body>
        </html>
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
