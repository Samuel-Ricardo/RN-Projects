const Mongoose = require("mongoose");

const helperSchema = new Mongoose.Schema({ //nameHelper, cnhHelper, expireDateHelper, telHelper, typeVehicle, addPor: []
    nameHelper: {
        type: String,
        required: true
    },
    cpfHelper: {
        type: String,
        required: true
    },
    expireBuonny: {
        type: String,
        required: true
    },

    expireOpentech : {
        type: String,
        required: true
    },

    isActive : {
        type: Boolean,
        required: true
    },

    telHelper: {
        type: String,
        required: true
    },

    addPor: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }

})

module.exports = Mongoose.model('helper', helperSchema);
