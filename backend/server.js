require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const stripeProductRoutes = require("./routes/stripeProductRoutes");
const userRoutes = require("./routes/userRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://stephanies-website-frontend.onrender.com/",
      "https://stephanies-website-backend.onrender.com/",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Connect to Mongo
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo connection error:", err));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/stripeProducts", stripeProductRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/users", userRoutes);

// Catch-all for undefined routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
