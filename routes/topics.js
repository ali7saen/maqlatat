const router = require("express").Router();

router.get("/", async (req, res)=> {
    const viewData = {
        title : "المواضيع | مقالات"
    }
    res.render("./frontend/topics", viewData);
})

module.exports = router;