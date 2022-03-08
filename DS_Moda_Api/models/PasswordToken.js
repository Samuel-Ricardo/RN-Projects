const mongoose = require("mongoose");

const passwordTokenSchema = new mongoose.Schema({
    token : {
        type : Array,
        required: true
    },
    used: {
        type: Boolean,
        default: false
    }


})

module.exports = mongoose.model('passwordToken', passwordTokenSchema);