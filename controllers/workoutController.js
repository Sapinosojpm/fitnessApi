const Workout = require("../models/Workout");

exports.addWorkout = async (req, res) => {
    try {
        console.log("🔍 Received Data:", req.body);
        console.log("👤 User ID:", req.user?.id); // Debug user ID

        const { name, duration } = req.body;

        if (!name || !duration) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const workout = new Workout({
            userId: req.user.id, // Change "user" to "userId"
            name,
            duration,
            status: "pending",
            completed: false
        });

        await workout.save();

        res.status(201).json(workout);
    } catch (error) {
        console.error("❌ Error Adding Workout:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getMyWorkouts = async (req, res) => {
    try {
        console.log("User ID from token:", req.user.id); // Debugging

        const workouts = await Workout.find({ userId: req.user.id });  // ✅ Correct field name

        console.log("Retrieved Workouts:", workouts); // Debugging

        res.json(workouts);
    } catch (error) {
        console.error("Error in getMyWorkouts:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("📝 Received Update Request for ID:", id);

        const workout = await Workout.findById(id);
        if (!workout) {
            console.log("❌ Workout not found in DB!");
            return res.status(404).json({ message: "Workout not found" });
        }

        console.log("✅ Workout found:", workout);
        workout.name = req.body.name || workout.name;
        workout.duration = req.body.duration || workout.duration;

        await workout.save();
        console.log("✅ Workout Updated Successfully:", workout);

        res.json(workout);
    } catch (error) {
        console.error("❌ Error in updateWorkout:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



exports.deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params;

        const workout = await Workout.findByIdAndDelete(id);
        if (!workout) return res.status(404).json({ message: "Workout not found" });

        res.json({ message: "Workout deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.completeWorkoutStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const workout = await Workout.findById(id);
        if (!workout) return res.status(404).json({ message: "Workout not found" });

        workout.completed = !workout.completed;
        await workout.save();

        res.json(workout);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
