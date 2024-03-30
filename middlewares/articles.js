const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { createArticleValidation } = require("../functions/validations/articles");
const maxImageSize = 1024 * 1024 * 3;

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "../public/uploads/articles_image"))
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
        fileSize: maxImageSize, // 3 MB limits for ads image
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
        const maxSizeInBytes = maxImageSize; // 3 MB (same as the limit set in Multer)
        if (fileSizeInBytes > maxSizeInBytes) {
            res.status(400).json({ message: "Image size exceeds the limit." });
        }
        next();
    }
}

const articleDataValidation = async (req, res, next) => {
    const article = req.body;
    article["imgUrl"] = req.file.path;
    const validation_result = createArticleValidation(article);
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
        next()
    }
}


module.exports = { uploadImage: uploadImage, fileValidation: fileValidation, articleDataValidation: articleDataValidation }
