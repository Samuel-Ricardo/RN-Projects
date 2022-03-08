const Item = require("../models/Item");
const slug = require("slug");
class ItemsController{
    //CRUD 
    async list(req, res){
        const items = await Item.find({});
        res.send(items);
    }

    async getItem(req, res){
        const id = req.params.id;

        const item = await Item.findOne().where({_id: id});
        res.send(item);
        return {item};
    }
    
    async create(req, res){
        const { name , value, image_url, size } = req.body;

        const itemAlreadyExists = await Item.findOne().where({ name });

        if(itemAlreadyExists){
            res.status(400).send("Um item com esse nome ja foi cadastrado")
        }else{
            const slugName = slug(name);
            const savedItem = await Item.create({
                name,
                value,
                image_url,
                slug: slugName,
                size
            });
            if(savedItem != undefined){
                res.status(200).send("Item salvo com sucesso")
                console.log(savedItem)
            }else{
                res.status(400).send("Ocorreu um erro e o usuário não foi salvo")
            }   
        }
    }

    async getNameItem(req, res){
        const name = req.body.name;
        const slugName = slug(name);

        const item = await Item.findOne().where({slug : slugName});
        if(item == null){
            res.status(404).send("O item não existe")
        }else{
            res.send({error: false, item})
        }
    }

    

    //SEM TRATAMENTO DE ERRO !!!
    async delete(req, res){
        const id = req.params.id;
        const itemDeleted = await Item.deleteOne().where({_id: id});
        if (itemDeleted != undefined) {
            res.status(200).send("Item deletado com sucesso")
        } else {
            res.status(400).send("O Item não pôde ser deletado")
        }
    }

    async update(req, res){
        const { itemId, name , value, img_url, size } = req.body;
        const slugName = slug(name);
        const updatedItem = await Item.findOneAndUpdate({_id : itemId}, {name , value , img_url, slug: slugName, size});
        if(typeof(updatedItem) == "object"){
            res.send("Item atualizado com sucesso")
        }else{
            res.send("Não foi possivel atualizar o item")
        }
    }
    //Extras
    //Adicionando o estoque do item
    async addStock(req , res){
        const { id, stock} = req.body;
        
        // const item = await Item.findOne().where({_id: id});
        // const currentStock = stock + item.stock;
        // console.log(item.name)

        const stockIncreased = await Item.findOneAndUpdate({_id: id}, {$set: { stock}})

        if (stockIncreased != undefined) {
            res.status(200).send("O estoque do item foi armazenado com sucesso");
        } else {
            res.status(400).send("Ocorreu um erro")
        }
    }



}

module.exports = new ItemsController;