const Mongoose = require("mongoose");

const pilotSchema = new Mongoose.Schema({ //namePilot,cnhPilot, expireDate, telPilot
    namePilot: {
        type: String,
        required: true
    },
    cpfPilot: {
        type: String,
        required: true
    },

    expireCNH: {
        type: String,
        required: true
    },

    expireBuonny: {
        type: String,
        required: true
    },

    expireApisul: {
        type: String,
        required: true
    },

    expireOpentech: {
        type: String,
        required: true
    },

    isActive :{
        type: Boolean,
        required: true
    },

    telPilot: {
        type: String,
        required: true
    },
    addPor: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }

})

module.exports = Mongoose.model('pilots', pilotSchema);
