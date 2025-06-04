const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");

// validator
const validate = require("../middlewares/validate");

const { registerSchema, loginSchema } = require("../validators/authValidators");

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.get("/", (req, res) => {
  res.send("This is the auth ");
});

module.exports = router;
