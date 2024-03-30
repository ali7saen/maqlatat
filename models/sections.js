const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectionsSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true 
    },
    articleNumbers: {
        type: String,
        required: true,
    },
    publisher : {
        type: String,
        required: true,
    }
}, {
    timestamps : true
});

module.exports = mongoose.model("Sections", sectionsSchema);
