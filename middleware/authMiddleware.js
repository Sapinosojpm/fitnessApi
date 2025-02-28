const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
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
        next();
    } catch (error) {
        console.error("❌ JWT Verification Error:", error.message);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
