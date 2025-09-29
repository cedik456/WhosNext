const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  getConversations,
  getMessages,
  sendMessages,
  markMessagesAsRead,
  deleteConversation,
} = require("../controllers/messageController");

// Conversations (inbox preview)
router.get("/conversations", auth, getConversations);

// Chats
router.get("/:matchId", auth, getMessages);

// Send Message
router.post("/", auth, sendMessages);

// Reading Message
router.patch("/markAsRead/:matchId", auth, markMessagesAsRead);

// delete conversation
router.delete("/conversations/:matchId", auth, deleteConversation);

module.exports = router;
