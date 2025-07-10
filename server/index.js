const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// routes

const authRoutes = require("./routes/authRoutes");
const onBoardingRoutes = require("./routes/onboardingRoutes");
const cardRoutes = require("./routes/cardRoutes");
const swipeRoutes = require("./routes/swipeRoutes");
const matchRoutes = require("./routes/matchRoutes");
const messageRoutes = require("./routes/messageRoutes");

// route links

app.use("/api/auth/", authRoutes);
app.use("/api/onboarding/", onBoardingRoutes);
app.use("/api/card/", cardRoutes);
app.use("/api/swipe/", swipeRoutes);
app.use("/api/matches/", matchRoutes);
app.use("/api/messages/", messageRoutes);

// connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
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
