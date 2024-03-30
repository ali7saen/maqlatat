const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const marked = require("marked");

const articlesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    htmlContent: {
        type: String,
        required: true,
    },
    topics: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    views: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    writer: {
        type: String,
        require: true
    },
    publisher: {
        type: String,
        require: true
    },
    frindlyUrl: {
        type: String,
        required: true,
        unique : true
    },
    keywords: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    }
}, {
    timestamps : true
})

module.exports = mongoose.model("articles", articlesSchema);