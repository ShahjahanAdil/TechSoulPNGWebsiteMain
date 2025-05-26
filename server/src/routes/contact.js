const express = require("express")
const nodemailer = require("nodemailer")
const { config } = require("dotenv")

const router = express.Router()
config()

router.post("/contact/send-mail", async (req, res) => {
    const { topic, username, email, message } = req.body;

    if (!email || !message || !username || !topic) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS,
            },
        });

        await transporter.sendMail({
            from: `"${username}" <${process.env.NODEMAILER_EMAIL}>`,
            to: process.env.NODEMAILER_EMAIL,
            replyTo: email,
            subject: `Contact Form - ${topic}`,
            html: `
                <h3>New Message from Contact Form</h3>
                <p><strong>Topic:</strong> ${topic}</p>
                <p><strong>Username:</strong> ${username}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong><br/>${message}</p>
      `,
        });

        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

module.exports = router