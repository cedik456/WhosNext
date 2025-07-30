const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 10000;

// middlewares

app.use(cors());
app.use(express.json());

// routes

const authRoutes = require("./routes/authRoutes");
const onBoardingRoutes = require("./routes/onboardingRoutes");
const cardRoutes = require("./routes/cardRoutes");
const swipeRoutes = require("./routes/swipeRoutes");
const matchRoutes = require("./routes/matchRoutes");
const messageRoutes = require("./routes/messageRoutes");
const profileRoutes = require("./routes/profileRoutes");
const preferenceRoutes = require("./routes/preferenceRoutes");

//
const { default: mongoose } = require("mongoose");

// route links

app.use("/api/auth/", authRoutes);
app.use("/api/onboarding/", onBoardingRoutes);
app.use("/api/card/", cardRoutes);
app.use("/api/swipe/", swipeRoutes);
app.use("/api/matches/", matchRoutes);
app.use("/api/messages/", messageRoutes);
app.use("/api/profile/", profileRoutes);
app.use("/api/preferences/", preferenceRoutes);

// socket.io setup

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  socket.on("join", (matchId) => {
    socket.join(matchId);
    console.log(`Joined room: ${matchId}`);
  });

  socket.on("sendMessage", ({ matchId, message }) => {
    io.to(matchId).emit("newMessage", { ...message, matchId });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error: ", error);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Backend Running");
});
