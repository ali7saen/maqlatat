const mongoose = require("mongoose");
const Schema = mongoose.Schema


const adminsSchema = new Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    position : {
        type : String,
        required : true
    },
    permission : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model("Admins", adminsSchema);