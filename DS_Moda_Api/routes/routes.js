const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const ItemController = require("../controllers/ItemController");
const PurchaseController = require("../controllers/PurchaseController");
const ServicesController = require("../controllers/ServicesController");

const AdminAuth = require("../middleware/AdminAuth");
const Correios = require("node-correios");
const correios = new Correios();
//CRUD usuários
router.get("/",(req,res)=>{
    res.send("Você está acessando uma API de SKL INFOTECH")
})

router.get("/list/users", AdminAuth, UserController.list);//ROTA DE ADM
router.get("/user/:id", UserController.getUser);

router.post("/add/users", UserController.create); 
router.post("/login", UserController.login); 
router.post("/user/history", UserController.userHistory);


router.post("/password/recovery", UserController.recoveryPassword)
router.get("/password/update/:token", UserController.tokenVerification);
router.post("/passwood/new", UserController.updatePassword);

router.delete("/delete/user/:id", UserController.delete);//ROTA DE ADM

router.post("/add/favorite", UserController.favoriteItems);
router.get("/favorites/:id", UserController.getFavorites);

//Services
router.post("/frete", ServicesController.freteCalc);
router.post("/cep", ServicesController.verificarCep);
router.post("/sendEmail", ServicesController.sendEmail);


//CRUD itens
router.get("/list/items", ItemController.list);

router.post("/add/items", ItemController.create); //ROTA DE ADM
router.post("/add/stock", ItemController.addStock);//ROTA DE ADM
router.delete("/delete/item/:id", ItemController.delete);//ROTA DE ADM
router.get("/item/:id", ItemController.getItem);
router.post("/get/item", ItemController.getNameItem);

router.post("/update/item", ItemController.update);


router.post("/purchase", PurchaseController.newPurchase);
router.post("/payPurchase", ServicesController.payPurchase);
router.get("/purchase", PurchaseController.allPurchase);

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