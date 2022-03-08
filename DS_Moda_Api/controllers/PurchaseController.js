const Purchase = require("../models/Purchase");
const Item = require("../models/Item");
const User = require("../models/User");
const Correios = require("node-correios");
const frete = require('frete');
const correios = new Correios();
const ServicesController = require("../controllers/ServicesController");


class PurchaseController{
    constructor(){

    }
    async allPurchase(req,res){
         const purchases = await Purchase.find();
         res.send(purchases);
    }

    async newPurchase(req, res){
        const { items , user, frete_data, cep_data} = req.body;

        const userInfo = await User.findOne().where({_id : user});
        var total_value = 0;
        var itemName = [];
        var itemId = [];
        const cepValue = frete_data.valor;
        items.forEach(async (element, index) => {
            const item = await Item.findOne().where({_id : element.id});
            await Item.findOneAndUpdate({_id: element.id}, {$set: { stock : item.stock - element.qnt}})
            total_value += item.value;
            console.log(total_value)
            itemName.push(item.name);
            itemId.push(item.id);   
            if ((items.length - 1) == index){
                total_value += cepValue;
                const purchase = await Purchase.create({
                    user,
                    total_value: total_value.toFixed(2),
                    items,
                    frete_data,
                    cep_data
                });
                
                //const userUpdateHistory = await User.findOneAndUpdate({_id: user},{$push: {historic: purchase.id }});
                res.status(200).send({error: false , purchase});
            }

        });
    }


}

module.exports = new PurchaseController();