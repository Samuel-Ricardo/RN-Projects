if (process.env.NODE_ENV == "production") {
    module.exports = {
        mongoURI : "mongodb+srv://ggibamede:ggibamede@cluster0.vr819.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    }
} else {
    module.exports = {
        mongoURI : "mongodb+srv://ggibamede:ggibamede@cluster0.vr819.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    }
}