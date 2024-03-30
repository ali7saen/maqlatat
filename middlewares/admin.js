const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { registerValidation } = require("../functions/validations/register");
const Users = require("../models/admins");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "../public/uploads/admins_image"))
    },
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
        // Accept the file
        callback(null, true);
    } else {
        // Reject the file
        req.fileValidationError = "Only JPG images are allowed.";
        callback(null, false);
    }
};

const uploadImage = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 10, // 10 MB limits for personal image
    },
    fileFilter: fileFilter
});

const fileValidation = async (req, res, next) => {
    if (!req.file) {
        // Handle the error message from file filter
        if (req.fileValidationError) {
            res.status(400).json({ message: req.fileValidationError });
        } else {
            console.log("error");
            res.status(400).json({ message: "No image uploaded." });
        }
    }

    if (req.file) {
        const fileSizeInBytes = req.file.size;
        const maxSizeInBytes = 1024 * 1024 * 10; // 10 MB (same as the limit set in Multer)
        if (fileSizeInBytes > maxSizeInBytes) {
            res.status(400).json({ message: "Image size exceeds the limit." });
        }
        next();
    }
}

const adminDataValidation = async (req, res, next) => {
    const userData = req.body;
    const validation_result = registerValidation(userData);
    const errorMessage = validation_result.error
    if (errorMessage) {
        fs.unlink(req.file.path, (err) => {
            if (err) {
                res.status(500).json({ message: "500 Internal Server Error" });
            } else {
                res.status(400).json({ message: errorMessage.details[0].message });
            }
        })
    } else {
        const isUnique = await usernameIsUnique(userData.username);
        if (isUnique) {
            next()
        }
        else {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: "500 Internal Server Error" });
                } else {
                    res.status(400).json({ message: "This username is not available" });
                }
            })
        }
    }
}

async function usernameIsUnique(usernameValue) {
    const user = await Users.find({ username: usernameValue });
    if (user.length > 0) {
        return false
    } else {
        return true
    }
}



module.exports = { uploadImage: uploadImage, fileValidation: fileValidation, adminDataValidation: adminDataValidation }
