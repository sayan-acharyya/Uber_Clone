const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const captainModel = require("../models/captain.model");
const blackListTokenModel = require("../models/blacklistToken.model");

function extractToken(req) {
    if (req.cookies && req.cookies.token) return req.cookies.token;
    const auth = req.headers && req.headers.authorization;
    if (auth && auth.startsWith("Bearer ")) return auth.split(" ")[1];
    return null;
}

module.exports.authUser = async (req, res, next) => {
    const token = extractToken(req);
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const isBlacklisted = await blackListTokenModel.findOne({ token });
    if (isBlacklisted) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) return res.status(401).json({ message: "Unauthorized" });

        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }


}


module.exports.authCaptain = async (req, res, next) => {
    const token = extractToken(req);
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const isBlacklisted = await blackListTokenModel.findOne({ token });
    if (isBlacklisted) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        if (!captain) return res.status(401).json({ message: "Unauthorized" });

        req.captain = captain;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
 
}





