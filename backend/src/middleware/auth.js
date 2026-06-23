const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header) {
            return res.status(401).json({ message: "No token provided" });
        }

        const parts = header.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const token = parts[1];

        const decoded = jwt.verify(token, process.env.JWTACCESS);

        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = auth;