
/*
CREATED BY SAMUEL KEULLEN 16/01/2021
*/

const Mongoose = require("../Database/Connection")
const Float = require("mongoose-float").loadType(Mongoose)


const ArraySchema = new Mongoose.Schema ({

    temp: {
        type: [temp],
    default: undefined
    },

    tempIds: {
        type: [tempIds],
    default: undefined
    },

    data: {
        type: [data],
    default: undefined
    }
});


   
   const Array = Mongoose.model('Array', ArraySchema)

   module.exports = Array;
