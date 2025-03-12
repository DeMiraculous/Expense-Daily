const jsonwebtoken = require("jsonwebtoken");

const jwtManager = (user) => {
    const accessToken = jsonwebtoken.sign({
        id: user.id,
        name: user.name
    },
        process.env.Jwt_Key
    );
    return jsonwebtoken;
};
module.exports = jwtManager;