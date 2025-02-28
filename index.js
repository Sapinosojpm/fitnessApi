const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
        app.listen(process.env.PORT || 4000, () => {
            console.log(`Server running on port ${process.env.PORT || 4000}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    });


module.exports = app;
