const jsonwebtoken = require("jsonwebtoken");

const auth = (req, res, next) => {
    // console.log(req.headers);

    try {
        const accessToken = req.headers.authorization.replace("Bearer ", "");
        const jwt_Payload = jsonwebtoken.verify(
            accessToken,
            process.env.Jwt_Key
        );
        req.user = jwt_Payload

    } catch (error) {
        res.status(401).json({
            status: "failed",
            message: "Unauthorized!"
        });
        return;
    }
    next();
}

module.exports = auth;