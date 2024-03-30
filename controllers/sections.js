const Sections = require("../models/sections");
const {getFormattedDate, getFormattedTime} = require("../functions/functions")
async function getSectionsPage_get (req, res) {

    const obj = await Sections.find();
    let sections = [];

    for (const section of obj) {
        sections.push({
            id : section.id,
            title : section.title,
            articleNumbers : section.articleNumbers,
            date : getFormattedDate(section.createdAt),
            time : getFormattedTime(section.createdAt),
            publisher : section.publisher
        });
    }
    const viewData = {
        title : "الأقسام | لوحة التحكم",
        sections : sections
    }
    res.status(200).render("./backend/sections/get", viewData);
}

function addSections_get(req, res) {
    const viewData = {
        title : "الأقسام | لوحة التحكم"
    }
    res.status(200).render("./backend/sections/add", viewData);
}

async function addSctions_post (req, res) {
    let title = req.body.title;
    let articleNumbers = req.body.articleNumbers;
    let publisher = req.body.publisher;

    if(title.length == 0 || articleNumbers.length == 0 ) {
        res.status(400).json({message : "some data is missing"});
    } else if (publisher.length == 0){
        res.status(400).json({message : "some data is missing"});
    }
    else {
        try {
            await Sections.create({
                title : title,
                articleNumbers : articleNumbers,
                publisher : publisher
            });
            res.status(201).json({});
        } catch (error) {
            res.status(500).json({message : "This service is not available now"});
            console.log(error.message);
        }
        
    }
}

module.exports = {
    getSectionsPage_get : getSectionsPage_get,
    addSections_get : addSections_get,
    addSctions_post : addSctions_post
}