const Mongoose = require("mongoose");

const carSchema = new Mongoose.Schema({ //plateNumb, model, brand, year, expireCarDocs, ownerName
    
    owner: {
        type: String,
        required: true
    },
    
    year: {
         type: String,
         required: true
    },

    numANTT: {
        type: String,
        required: true
    },

    expireANTT: {
        type: String,
        required: true
    },

    expireOpentech: {
        type: String,
        required: true
    },

    isSendForBuonny: {
        type: Boolean,
        required: true
    },

    plateNumber: {
        type: String,
        required: true
    },

    isActive: {
        type: Boolean,
        required: true
    },

    addPor: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }

})

module.exports = Mongoose.model('car', carSchema);
