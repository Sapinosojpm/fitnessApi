const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Change "user" to "userId"
    name: { type: String, required: true },
    duration: { type: String, required: true },
    status: { type: String, default: "pending" },
    completed: { type: Boolean, default: false }, // Add completed field
    dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Workout", workoutSchema);
