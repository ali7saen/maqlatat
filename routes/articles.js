const router = require("express").Router();
const { require_jwt_token } = require("../middlewares/auth");
const Articles = require("../models/articles");
const {addArticle_post} = require("../controllers/articles");
const {articleDataValidation, uploadImage, fileValidation} = require("../middlewares/articles")

router.get("/", async (req, res)=> {
    const viewData = {
        title : "آخر المقالات | مقالات"
    }
    res.render("./frontend/articles", viewData);
})

router.get("/:id", async (req, res)=> {
    const viewData = {
        title : " عنوان المقال | مقالات"
    }
    res.render("./frontend/read-article", viewData);
})


// dashboards 
router.post("/manage/add", require_jwt_token, uploadImage.single("image"), fileValidation, articleDataValidation, addArticle_post);
router.get("/manage/delete/:id", require_jwt_token, async (req, res)=> {
    const id = req.params.id;
    try {
        await Articles.findOneAndDelete(id); 
        res.status(200).json({})
    } catch (error) {
        res.status(400).json({message : error.message})
    }
});
module.exports = router;