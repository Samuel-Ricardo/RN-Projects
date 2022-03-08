if (process.env.NODE_ENV == "production") {
    module.exports = {
        //mongoURI : "mongodb+srv://ggibamede:ggibamede@cluster0.vr819.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        mongoURI : "mongodb+srv://Developer:SKL_FR_2077@cluster0.9qpge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    }
} else {
    module.exports = {
        //mongoURI : "mongodb+srv://ggibamede:ggibamede@cluster0.vr819.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        mongoURI : "mongodb+srv://Developer:SKL_FR_2077@cluster0.9qpge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    }
}