// server/api/contact.post.ts
import { H3Event } from "h3";
import nodemailer from "nodemailer";

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody(event);
    const { firstName, lastName, email, message } = body;

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

    // Create mail transporter (using ethereal for development)
    const transport = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "ethereal.user@ethereal.email",
        pass: "ethereal.pass",
      },
    });

    // Prepare email content
    const mailOptions = {
      from: `"${firstName} ${lastName}" <${email}>`,
      to: "contact@pearsonpub.com",
      subject: "New Contact Form Submission - The Pearson Pub",
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        &lt;h2&gt;New Contact Form Submission&lt;/h2&gt;
        &lt;p&gt;&lt;strong&gt;Name:&lt;/strong&gt; ${firstName} ${lastName}&lt;/p&gt;
        &lt;p&gt;&lt;strong&gt;Email:&lt;/strong&gt; ${email}&lt;/p&gt;
        &lt;p&gt;&lt;strong&gt;Message:&lt;/strong&gt;&lt;/p&gt;
        &lt;p&gt;${message.replace(/\n/g, "&lt;br&gt;")}&lt;/p&gt;
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

