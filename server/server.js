const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

dotenv.config();

connectDB();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Server is running successfully!");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});