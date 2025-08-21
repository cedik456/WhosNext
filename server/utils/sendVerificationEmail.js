// const { Resend } = require("resend");

// const resend = new Resend(process.env.RESEND_API_KEY);

// async function sendVerificationEmail(user, token) {
//   const verifyUrl = `http://192.168.1.8:3000/api/auth/verify?token=${token}`;

//   await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: user.email,
//     subject: "Verify your email",
//     html: `<p>Welcome to Who’s Next! Please verify your account:</p>
//            <a href="${verifyUrl}">${verifyUrl}</a>`,
//   });
// }

// module.exports = { sendVerificationEmail };

// const { Resend } = require("resend");
// const resend = new Resend(process.env.RESEND_API_KEY);

const crypto = require("crypto");
const VerificationCode = require("../models/VerificationCodeSchema");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // the App Password
  },
});

function makeCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerificationCode(userId, email) {
  const code = makeCode();
  const codeHash = crypto.createHash("sha256").update(code).digest("hex");

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await VerificationCode.findOneAndUpdate(
    { userId },
    { codeHash, expiresAt, attempts: 0 },
    { upsert: true, new: true }
  );

  try {
    await transporter.sendMail({
      from: `"Who’s Next" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Who’s Next verification code",
      html: `
        <p>Hey,</p>

        <p>My name is Ced — I'm the founder and CEO of <strong>Who’s Next</strong>.</p>

        <p>We built Who’s Next to make connecting job seekers and recruiters simple, fast, and meaningful.</p>

        <p>Here’s your verification code:</p>
        <h2 style="letter-spacing:4px; font-size: 24px;">${code}</h2>
        <p>This code expires in 10 minutes. If you didn’t sign up, you can safely ignore this email.</p>

        <p>P.S. — I’d love to know what brought you to Who’s Next. Just hit “Reply” and let me know. I read and reply to every message.</p>

        <p>Cheers,<br/>Ced<br/>CEO & Founder, Who’s Next</p>
        `,
    });
    console.log(`✅ Verification code sent to ${email}`);
  } catch (err) {
    console.error("❌ Error sending verification email:", err.message);
  }
}

module.exports = { sendVerificationCode };
