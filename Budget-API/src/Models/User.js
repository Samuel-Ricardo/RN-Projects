
/*
CREATED BY SAMUEL KEULLEN 16/01/2021
*/

const Mongoose = require("../Database/Connection")
const Float = require("mongoose-float").loadType(Mongoose)
const bcryptjs = require("bcryptjs")

const UserSchema = new Mongoose.Schema ({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
   },

   password: {

    type: String,
    required: true,
    select: false,
   },

   monthlyRevenue: {

    type: Float
    
   },

   outstandingHospitalBills: {

    type: Boolean
   },

   hospitalBills: {

    type: Float
   },

   hospitalBillPayer: {

    type: String,
    enum: ['ME', 'MY COMPANY', ''],
    default: ''
   },

   passwordResetToken: {

    type: String,
    select: false
   },

   passwordResetExpires: {

    type: Date,
    select: false
   },

   authenticationToken: {

    type: String,
    required: false

   },

   createdAt: {
       type: Date,
       default: Date.now
   }

});


UserSchema.pre('save', async function(next){

    if(this.password === null || this.password === undefined){

        next();
    }

    const hash = await bcryptjs.hash(this.password, 10)

    this.password = hash

    next();
 })

 const User = Mongoose.model('User', UserSchema)

 module.exports = User;