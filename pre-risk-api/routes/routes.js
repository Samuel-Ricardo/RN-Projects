const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const ItemController = require("../controllers/ItemController");
const ServicesController = require("../controllers/ServicesController");

const AdminAuth = require("../middleware/AdminAuth");
const Correios = require("node-correios");
const correios = new Correios();
//CRUD usuários
router.get("/",(req,res)=>{
    res.send("Você está acessando uma API do PRE-RISK")
})

router.get("/list/users", AdminAuth, UserController.list);//ROTA DE ADM
router.get("/user/:id", UserController.getUser);

router.post("/add/users", UserController.create);
router.post("/login", UserController.login);
router.post("/user/history", UserController.userHistory);


router.post("/password/recovery", UserController.recoveryPassword)
router.get("/password/update/:token", UserController.tokenVerification);
router.post("/password/new", UserController.updatePassword);

router.delete("/delete/user/:id", UserController.delete);//ROTA DE ADM

router.post("/addToUser/docs", UserController.addDocs);
router.get("/docs/:id", UserController.getDocs);

//Services
//router.post("/frete", ServicesController.freteCalc);
//router.post("/cep", ServicesController.verificarCep);
router.post("/sendEmail", ServicesController.sendEmail);
router.post("/get-expire-docs", ServicesController.getExpireDocs);


//CRUD itens
router.get("/list/docs", ItemController.list);
router.get('/get/pilots/:addBy', ItemController.getPilots)
router.get('/get/helpers/:addBy', ItemController.getHelpers)
router.get('/get/vehicles/:addBy', ItemController.getVehicles)

router.post("/add/docs", ItemController.createDocs); //ROTA DE ADM
router.post("/add/car", ItemController.createCar); //ROTA DE ADM
router.post("/add/helper", ItemController.createHelper); //ROTA DE ADM
//router.post("/add/stock", ItemController.addStock);//ROTA DE ADM
router.get("/doc/:id", ItemController.getItem);//GET SPECIFIC DOC
router.post("/get/doc-by-name", ItemController.getNameItem);//GET SPECIFIC DOC BY DRIVER NAME

router.post('/doc/search', ItemController.findDocs);

router.delete("/delete/docs/:id", ItemController.delete);//ROTA DE ADM
router.delete('/delete/vehicle/:id', ItemController.deleteVehicle);
router.delete('/delete/helper/:id', ItemController.deleteHelper);

router.post("/update/doc", ItemController.update);
router.post("/update/docs", ItemController.updateDoc);

router.post("/item",(req, res)=>{
    let item = req.body.item;

    item--;
    console.log(item)


})

router.post("/teste", (req, res)=>{
    const items = req.body.items;
    console.log(items)
})

router.get("*", (req,res) => {
    res.send("Rota errada tente novamente")
});


module.exports = router;
