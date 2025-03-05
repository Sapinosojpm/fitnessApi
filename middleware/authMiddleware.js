const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    console.log("Received Token:", token);

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", verified);

        req.user = verified;

        // Fetch user from DB to check admin status
        const user = await User.findById(verified.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user.isAdmin = user.isAdmin; // Store admin status

        next();
    } catch (error) {
        console.error("❌ JWT Verification Error:", error.message);
        res.status(401).json({ message: "Invalid token" });
    }
};

// Middleware to restrict access to admins only
const adminMiddleware = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware };
