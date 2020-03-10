const jwt = require("jsonwebtoken");
const config = require("config");

const checkUser = async (req, res, next) => {
    try {
        
        const token = req.header("Authorization");
        
        if(!token) {
            return res.send(401).json({message: "No token, authorization denied"})
        }

        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded.user;
        next();

    } catch (err) {
        console.log(err);
    }
}

module.exports = checkUser;