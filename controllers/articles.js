const Articles = require("../models/articles");
const {renderArticleContent, makeURLFriendlyAndCheckIfItsUnique} = require("../functions/articles")

const addArticle_post = async (req, res) => {
    const Url = await makeURLFriendlyAndCheckIfItsUnique(req.body.title);
    if (Url == null) {
        res.status(400).json("title is not uniqe")
    } else {

        req.body.frindlyUrl = Url;
        const htmlContent = renderArticleContent(req.body.content);
        req.body.htmlContent = htmlContent;

        const article = {
            title: req.body.title,
            caption: req.body.caption,
            htmlContent : req.body.htmlContent,
            section : req.body.section,
            topics : req.body.topics,
            description : req.body.description,
            views : req.body.views,
            writer : req.body.writer,
            publisher : req.body.publisher,
            keywords : req.body.keywords,
            imgUrl : req.body.imgUrl
        }

        try {            
            await Articles.create(article);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({message : "Enternal Server Error"});
        }
    }
}

module.exports = {
    addArticle_post : addArticle_post
}