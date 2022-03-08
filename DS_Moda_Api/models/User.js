const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    number:{
        type:String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    // passwordResetToken: {
    //     type: String,
    //     seletc: false
    // },
    // passwordResetExpires: {
    //     type: Date,
    //     select: false
    // },
    // authenticationToken: {
    //     type: String,
    //     required: false
    // },
    historic:{
        type: Array,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    favoriteItems:{
        type: Array,
        default: []
    }

});

// do something before save

// in case, generate password hash

// UserSchema.pre('save', async function (next) {

//     if (this.password === null || this.password === undefined) {
//         next();
//     }

//     const hash = await bcrypt.hash(this.password, 10)

//     this.password = hash

//     next();
// })

module.exports = mongoose.model('user', userSchema);
