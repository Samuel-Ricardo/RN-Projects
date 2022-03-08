
/*
CREATED BY SAMUEL KEULLEN 16/01/2021
*/

const Mongoose = require("../Database/Connection")
const Float = require("mongoose-float").loadType(Mongoose)


const CategorieSchema = new Mongoose.Schema ({

    title: {
        type: String,
        required: true
    },

    amount: {
        type: Float,
        required: true
    },

    percentage: {
        type: Float,
        required: true
    },

    is_locked: {
        type: Boolean,
        default: false
    },

   budget: {

       type: Mongoose.Schema.Types.ObjectId,
       ref: "Budget"
  }
});


   
   const Categorie = Mongoose.model('Categorie', CategorieSchema)

   module.exports = Categorie;
