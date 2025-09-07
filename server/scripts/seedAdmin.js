const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/UserSchema");

require("dotenv").config({
  path: require("path").join(__dirname, "..", ".env"),
});

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "admin@whosnext.app";
    const password = "adminadmin"; // 👈 change this
    const hashedPassword = await bcrypt.hash(password, 10);

    const existing = await User.findOne({ email });
    if (existing) {
      existing.role = "admin";
      existing.password = hashedPassword;
      await existing.save();
      console.log("✅ Existing user promoted to admin:", email);
    } else {
      await User.create({
        name: "System Admin",
        email,
        password: hashedPassword,
        role: "admin",
        isVerified: true,
        isOnboarded: true,
      });
      console.log("✅ New admin created:", email);
    }

    console.log("👉 Use this to log in:");
    console.log("Email:", email);
    console.log("Password:", password);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
}

createAdmin();
