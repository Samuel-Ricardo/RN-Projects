
/*
CREATED BY SAMUEL KEULLEN 16/01/2021
*/

const Mongoose = require("../Database/Connection")
const Float = require("mongoose-float").loadType(Mongoose)


const QuestionsSchema = new Mongoose.Schema ({

    /*
    temp = [
            amount= "43",
                idTemp= 1,
                is_locked= false,
                percentage= 10,
                title= "Gas",
        ],
        tempIds=[
            id=idTemp
                ]
   */
    array: {

        type: Mongoose.Schema.Types.ObjectId,
        ref: "Array"
   },
    user: {
       type: Mongoose.Schema.Types.ObjectId,
       ref: "User"
   }

});


   
   const Questions = Mongoose.model('Questions', QuestionsSchema)

   module.exports = Questions;
