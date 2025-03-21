import jsonwebtoken from "jsonwebtoken";

const jwtManager = (user) => {
    const accessToken = jsonwebtoken.sign({
        id: user.id,
        name: user.name
    },
        process.env.Jwt_Key
    );
    return jsonwebtoken;
};
export default jwtManager;