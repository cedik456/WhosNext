const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  getConversations,
  getMessages,
  sendMessages,
} = require("../controllers/messageController");

// Conversations (inbox preview)
router.get("/conversations", auth, getConversations);

// Chats
router.get("/:matchId", auth, getMessages);

// Send Message
router.post("/", auth, sendMessages);

module.exports = router;
