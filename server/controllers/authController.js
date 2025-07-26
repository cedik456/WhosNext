const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/UserSchema");
const getRandomAvatar = require("../utils/avatarHelper");

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
    });

    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isOnboarded: user.isOnboarded,
        avatar: user.avatar,
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

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log(token);

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
