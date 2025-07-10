const express = require("express");
const router = express.Router();

const {
  register,
  login,
  phoneAuth,
  me,
} = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");

// validator
const validate = require("../middlewares/validate");

const { registerSchema, loginSchema } = require("../validators/authValidators");

router.get("/me", auth, me);

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.post("/phone", phoneAuth);

router.get("/", (req, res) => {
  res.send("This is the auth ");
});

module.exports = router;
