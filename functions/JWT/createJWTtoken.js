require("dotenv").config();
const JWT = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createJwtToken = (id) => {
    return JWT.sign({id}, process.env.JWT_SECRET, {
        expiresIn : maxAge
    });
}

module.exports = {
    createJwtToken : createJwtToken,
    maxAge : maxAge
}