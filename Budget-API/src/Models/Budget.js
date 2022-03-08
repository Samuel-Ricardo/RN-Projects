
/*
CREATED BY SAMUEL KEULLEN 16/01/2021
*/

const Mongoose = require("../Database/Connection")
const Float = require("mongoose-float").loadType(Mongoose)


const BudgetSchema = new Mongoose.Schema ({//categories: int, budget_total : string

    total_amount: {
        type: Float,
        required: true
    },

    categories: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    }],

   user: {
       type: Mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true
   }
});


 const Budget = Mongoose.model('Budget', BudgetSchema)

 module.exports = Budget;
