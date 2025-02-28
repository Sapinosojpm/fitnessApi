const express = require("express");
const { addWorkout, getMyWorkouts, updateWorkout, deleteWorkout, completeWorkoutStatus } = require("../controllers/workoutController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/addWorkout", authMiddleware, addWorkout);
router.get("/getMyWorkouts", authMiddleware, getMyWorkouts);
router.patch("/updateWorkout/:id", authMiddleware, updateWorkout);
router.delete("/deleteWorkout/:id", authMiddleware, deleteWorkout);
router.patch("/completeWorkoutStatus/:id", authMiddleware, completeWorkoutStatus);

module.exports = router;
