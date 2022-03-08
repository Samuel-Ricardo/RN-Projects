const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        default: true
    },
    size: {
        type: String,
        required: false
    },
    image_url:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        default: 0
    },
    favoritedBy:{
        type: Array,
        default: []
    }

})

module.exports = mongoose.model('item', itemSchema);