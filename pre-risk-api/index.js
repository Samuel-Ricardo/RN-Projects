const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const mongoose = require("mongoose");
const app = express();
const db = require("./config/db");

app.use(cors());
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
    extended: false
  }));
app.use(bodyParser.json());

app.set("view engine","ejs")

app.use(routes);
//Mongoose Config
//mongoose.set('useFindAndModify', false);



const port = process.env.PORT || 8080;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
};

mongoose.set('useFindAndModify', false);

mongoose.connect(db.mongoURI , connectionParams).then(()=>{
    console.log("Conectado ao banco de dados")
}).catch(()=>{
    console.error("Ocorreu um erro na conexão")
})

app.listen(port, ()=>{
    console.log("Running ...")
})