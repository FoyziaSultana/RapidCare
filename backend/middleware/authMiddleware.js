const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "Access denied!",
                success: false
            });
        }

        const decodedToken = jwt.verify(
            token.replace("Bearer ", ""),
            process.env.JWT_SECRET_KEY
        );

        req.user = decodedToken;

        next();

    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid token!",
            success: false
        });
    }
};

module.exports = authMiddleware;