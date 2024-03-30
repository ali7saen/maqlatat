const jwt = require("jsonwebtoken");
require("dotenv").config();
const Admins = require("../models/admins");

const require_jwt_token  = (req, res, next)=> {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, encodedToken) => {
            if (err) {
                res.redirect("/auth/login");
            } else {
                const admin = await Admins.findById(encodedToken.id)
                res.locals.admin = admin;
                next();
            }
        })
    } else {
        res.redirect("/auth/login");
    }
}


const check_if_login  = (req, res, next)=> {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, encodedToken)=>{
            if (err) {
                next();
            } else {
                res.redirect("/dashboard/");
            }
        })
    } else {
        next();
    }
}

module.exports = {require_jwt_token : require_jwt_token,
    check_if_login : check_if_login};