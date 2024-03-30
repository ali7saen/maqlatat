require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { check_if_login, require_jwt_token } = require("./middlewares/auth");
const cookieParser = require("cookie-parser");


// express middlewares
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser())


// front handlears
app.get("/", (req, res) => {
    const viewData = {
        title: "مقالات"
    }
    res.render("./frontend/index", viewData);
});

const articlesRoutes = require("./routes/articles")
app.use("/articles", articlesRoutes);

const sectionsRoutes = require("./routes/sections")
app.use("/sections", sectionsRoutes);

const topicsRoutes = require("./routes/topics")
app.use("/topics", topicsRoutes);


// dashboard handllears
const authRoutes = require("./routes/auth");
app.use("/auth", check_if_login, authRoutes);

const adminsRoutes = require("./routes/admin");
app.use("/dashboard/admins", require_jwt_token, adminsRoutes);

// homepage routes
app.use("/dashboard", require_jwt_token, (req, res) => {
    const viewData = {
        title: "لوحة التحكم | الرئيسية",
    };
    res.render("./backend/dashboard", viewData);
});

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL)
    .then(() => {
        console.log("database is connected");
        app.listen(PORT, () => {
            console.log(`server is running on port: ${PORT}\ngo to: http://localhost:${PORT}/`);
        })
    })
    .catch(() => {
        console.log("database not connected");
    })