const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/UserSchema");
const getRandomAvatar = require("../utils/avatarHelper");
const {
  sendVerificationEmail,
  sendVerificationCode,
} = require("../utils/sendVerificationEmail");
const VerificationCode = require("../models/VerificationCodeSchema");

const JWT_SECRET = process.env.JWT_SECRET;

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "id name email avatar"
    );
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      avatar: getRandomAvatar(),
      isVerified: false,
    });

    await user.save();

    await sendVerificationCode(user._id, user.email);

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isOnboarded: user.isOnboarded,
        avatar: user.avatar,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Register error: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong during registration",
      details: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role ?? null },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    if (!user.isVerified) {
      await sendVerificationCode(user._id, user.email);

      return res.status(200).json({
        success: true,
        message: "Login Successful but email not verified",
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          isOnboarded: user.isOnboarded,
          isVerified: user.isVerified,
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Login Successful ",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isOnboarded: user.isOnboarded,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Login error: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong during login",
    });
  }
};

exports.phoneAuth = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number is required" });
    }

    let user = await User.findOne({ phoneNumber });

    if (!user) {
      user = await User.create({ phoneNumber });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isOnboarded: user.isOnboarded,
      },
    });
  } catch (error) {
    console.error("Phone login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during phone login",
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res
        .status(400)
        .type("html")
        .send("<h2> Invalid request: no token provided</h2>");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (payload.purpose !== "email_verify") {
      return res
        .status(400)
        .type("html")
        .send("<h2>❌ Invalid token purpose</h2>");
    }

    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(404).type("html").send("<h2>User not found </h2>");
    }

    if (user.isVerified) {
      return res
        .type("html")
        .send("<h2>Email already verified. You can log in now.</h2>");
    }

    user.isVerified = true;
    user.emailVerifiedAt = new Date();

    await user.save();

    res
      .type("html")
      .send(
        "<h2>✅ Email verified successfully. You can now return to the app and log in.</h2>"
      );
  } catch (error) {
    console.error("Verify error:", error);
    res.status(400).type("html").send("<h2>❌ Invalid or expired token</h2>");
  }
};

// exports.sendEmailCode = async (req, res) => {
//   const user = await User.findById(req.user.id);

//   if (!user)
//     return res.status(404).json({ success: false, message: "User not found" });

//   await sendVerificationCode(user._id, user.email);
//   res.json({ success: true, message: "Verification code sent" });
// };

exports.verifyEmailCode = async (req, res) => {
  try {
    let { code, userId } = req.body;
    // If you have auth middleware that sets req.user, prefer that
    userId = req.user?.id || userId;

    if (!userId || !code) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId or code." });
    }

    // Normalize code (e.g., pasted with spaces)
    code = String(code).trim();

    const record = await VerificationCode.findOne({ userId });
    if (!record) {
      return res
        .status(400)
        .json({ success: false, message: "No code to verify." });
    }

    // Expired?
    if (Date.now() > record.expiresAt.getTime()) {
      await record.deleteOne();
      return res.status(400).json({ success: false, message: "Code expired." });
    }

    // Too many attempts?
    if (record.attempts >= 5) {
      await record.deleteOne();
      return res.status(429).json({
        success: false,
        message: "Too many attempts. Request a new code.",
      });
    }

    // Compare hashes
    const codeHash = crypto.createHash("sha256").update(code).digest("hex");
    if (codeHash !== record.codeHash) {
      record.attempts += 1;
      await record.save();
      return res.status(400).json({ success: false, message: "Invalid code." });
    }

    // Mark user verified (idempotent)
    const user = await User.findById(userId);
    if (!user) {
      await record.deleteOne();
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    if (!user.isVerified) {
      user.isVerified = true;
      user.emailVerifiedAt = new Date();
      await user.save();
    }

    // Clean up the used code
    await record.deleteOne();

    return res.json({
      success: true,
      message: "Email verified.",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isOnboarded: user.isOnboarded,
        avatar: user.avatar,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    console.error("verifyEmailCode error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
