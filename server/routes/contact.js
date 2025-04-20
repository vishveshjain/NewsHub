import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Configure transporter using env variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'vishveshjain@outlook.com';
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: adminEmail,
    subject: `[Contact] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message.replace(/\n/g, '<br/>')}</p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

export default router;
