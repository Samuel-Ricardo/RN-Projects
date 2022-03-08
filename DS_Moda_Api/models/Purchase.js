const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
    items: {
        type : Array,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    total_value: {
        type: Number,
        default: 0
    },
    frete_data:{
        type : Object, 
        required: true
    },
    cep_data:{
        type: Object,
        required:true
    },
    purchaseDate:{
        type: Date,
        default: Date.now
    },
    finished: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('purchase', purchaseSchema);