const router = require("express").Router();
const {require_jwt_token} = require("../middlewares/auth");
const {getSectionsPage_get, addSections_get, addSctions_post} = require("../controllers/sections")
const Sections = require("../models/sections")
router.get("/", async (req, res)=> {
    const viewData = {
        title : "اقسام المقالات | مقالات"
    }
    res.render("./frontend/sections", viewData);
});


router.get("/manage", require_jwt_token, getSectionsPage_get);

router.get("/manage/add", require_jwt_token, addSections_get)

router.post("/manage/add", require_jwt_token, addSctions_post)

router.post("/manage/delete/:id", require_jwt_token, async(req, res)=>{
    try {
        let id = req.params.id;
        await Sections.findByIdAndDelete(id)
        res.status(200).json({});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
});

module.exports = router;