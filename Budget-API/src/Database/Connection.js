const mongoose = require('mongoose')
//DATABASE UPDATED
mongoose.connect('mongodb+srv://Developer:Developer_71@first-cluster-brazil-sp.dajyi.mongodb.net/db_budget-app?retryWrites=true&w=majority',
{

    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.Promise = global.Promise

module.exports = mongoose;