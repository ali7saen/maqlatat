const Admins = require("../models/admins");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { usernameValidation, passwordValidation } = require("../functions/validations/register");
const fs = require("fs");


const delteAdmin_get = (req, res) => {
    const PageData = {
        title: "لوحة التحكم | حذف ادمن",
    };
    res.render("./backend/delete-admins", PageData);
}

const deleteAdmin_post = async (req, res) => {
    const username = req.body.username;
    // Admin Username
    const userUsername = req.body.userUsername;
    const password = req.body.password;

    let validation_result = usernameValidation({ username: username });
    let errorMessage = validation_result.error

    if (errorMessage) {
        res.status(400).json({ message: errorMessage.details[0].message });
    } else {

        validation_result = passwordValidation({ password: password });
        errorMessage = validation_result.error
        if (errorMessage) {
            res.status(400).json({ message: errorMessage.details[0].message });
        } else {
            
            const user = await Admins.findOne({ username: userUsername });
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                const token = req.cookies.jwt;
                jwt.verify(token, process.env.JWT_SECRET, async (err, encodedToken) => {
                    const currentUser = await Admins.findById(encodedToken.id)
                    // check if the username is the username of the current user
                    if (currentUser.username == username) {
                        res.status(400).json({ message: "you can not delete Your account" });
                    } else {
                        try {
                            const user = await Admins.findOne({ username: username });
                            if (user) {
                                const userImagePath = user.imageUrl;
                                fs.unlink(userImagePath, async (err)=> {
                                    if (err) {
                                        res.status(500).json({ message: "Enternal Server Error with deleting user image" });
                                    } else {
                                        await Admins.deleteOne({ username: username });
                                        res.status(200).json({});
                                    }
                                })
                                res.status(400);
                            } else {
                                res.status(400).json({ message: "user dont found" });
                            }
                        } catch (err) {
                            res.status(500).json({ message: "Enternal Server Error" });
                        }
                    }
                })
            }
            else {
                res.status(400).json({ message: "Wrong Password" });
            }
        }
    }
};


const registerAdmin_get = (req, res) => {
    const PageData = {
        title: "لوحة التحكم | اضافة ادمن",
    };
    res.render("./backend/add-admins", PageData);
};


const registerAdmin_post = async (req, res) => {
    try {
        let userData = req.body;
        delete userData["repeat_password"];
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        userData.password = hashPassword;
        userData.imageUrl = req.file.path;
        const user = await Admins.create(userData);
        res.status(201).json({ user: user._id });
    } catch (err) {
        fs.unlink(req.file.path, () => {
            console.log(err);
            res.status(500).json({ message: "500 Internal Server Error" });
        });
    }
};

const logoutAdmin_get = (req, res) => {
    res.cookie("jwt", '', { maxAge: 1 });
    res.status(200).json({})
}


module.exports = {
    deleteAdmin_post: deleteAdmin_post,
    registerAdmin_get: registerAdmin_get,
    registerAdmin_post: registerAdmin_post,
    logoutAdmin_get: logoutAdmin_get,
    delteAdmin_get: delteAdmin_get
};