const Pilot = require("../models/Pilot");
const Car = require("../models/Car")
const Helper = require("../models/Helper")

const slug = require("slug");
class ItemsController {
    //CRUD
    async list(req, res) {
        const items = await Pilot.find({});
        res.send(items);
    }

    async getItem(req, res) {
        const id = req.params.id;

        const item = await Pilot.findOne().where({ _id: id });
        res.send(item);
        return { item };
    }

    async createDocs(req, res) {
        const { addBy, namePilot, cpfPilot, expireCNH, expireBuonny, expireApisul, expireOpentech, telPilot, isActive } = req.body;

        const itemAlreadyExists = await Pilot.findOne().where({ cpfPilot });

        if (itemAlreadyExists) {
            res.status(400).send({
                status: 400,
                message: "Um item com esse CNH ja foi cadastrado",
                data: undefined,
                error: true
            })
        } else {
            //const slugName = slug(name);
            const savedItem = await Pilot.create({
                addPor: addBy,
                namePilot,
                cpfPilot,
                expireCNH,
                expireBuonny,
                expireApisul,
                expireOpentech,
                telPilot,
                isActive
            });

            if (savedItem != undefined) {
                res.status(200).send({
                    status: 200,
                    message: "Item salvo com sucesso",
                    data: undefined,
                    error: false
                })
                console.log(savedItem)
            } else {
                res.status(400).send({
                    status: 400,
                    message: "Ocorreu um erro e o usuário não foi salvo",
                    data: undefined,
                    error: true
                })
            }
        }
    }

    async createCar(req, res) {
        const { addBy, year, owner, plateNumber, numANTT, expireANTT, expireOpentech, isSendForBuonny, isActive } = req.body;

        const itemAlreadyExists = await Car.findOne().where({ numANTT });

        if (itemAlreadyExists) {
            res.status(400).send({
                status: 400,
                message: "Um item com esse Placa ja foi cadastrado",
                data: undefined,
                error: true
            })
        } else {
            //const slugName = slug(name);
            const savedItem = await Car.create({
                addPor: addBy,
                year,
                numANTT,
                expireANTT,
                expireOpentech,
                isSendForBuonny,
                isActive,
                plateNumber,
                owner
            });

            if (savedItem != undefined) {
                res.status(200).send({
                    status: 200,
                    message: "Item salvo com sucesso",
                    data: undefined,
                    error: false
                })
                console.log(savedItem)
            } else {
                res.status(400).send({
                    status: 400,
                    message: "Ocorreu um erro e o usuário não foi salvo",
                    data: undefined,
                    error: true
                })
            }
        }
    }

    async createHelper(req, res) {
        const { addBy, nameHelper, cpfHelper, expireBuonny, expireOpentech, telHelper, isActive } = req.body;

        const itemAlreadyExists = await Helper.findOne().where({ cpfHelper });

        if (itemAlreadyExists) {
            res.status(400).send({
                status: 400,
                message: "Um item com esse CNH ja foi cadastrado",
                data: undefined,
                error: true
            })
        } else {
            //const slugName = slug(name);
            const savedItem = await Helper.create({
                addPor: addBy,
                nameHelper,
                cpfHelper,
                expireBuonny,
                expireOpentech,
                telHelper,
                isActive
            });

            if (savedItem != undefined) {
                res.status(200).send({
                    status: 200,
                    message: "Item salvo com sucesso",
                    data: undefined,
                    error: false
                })
                console.log(savedItem)
            } else {
                res.status(400).send({
                    status: 400,
                    message: "Ocorreu um erro e o usuário não foi salvo",
                    data: undefined,
                    error: true
                })
            }
        }
    }

    async getNameItem(req, res) {
        const name = req.body.driverName;
        const slugName = slug(name);

        const item = await Pilot.findOne().where({ slug: slugName });
        if (item == null) {
            res.status(404).send("O item não existe")
        } else {
            res.send({ error: false, item })
        }
    }


    async getPilots(req, res) {

        const pilot = await Pilot.find().where({ addPor: req.params.addBy })

        if (pilot) {
            return res.status(200).send({
                status: 200,
                message: "Encontrado com sucesso",
                data: { pilot },
                error: false
            })
        } else {
            return res.status(404).send({
                status: 404,
                message: "Nada foi encontrado",
                data: undefined,
                error: true
            })
        }
    }

    async getHelpers(req, res) {

        const helper = await Helper.find().where({ addPor: req.params.addBy })

        if (helper) {
            return res.status(200).send({
                status: 200,
                message: "Encontrado com sucesso",
                data: { helper },
                error: false
            })
        } else {
            return res.status(404).send({
                status: 404,
                message: "Nada foi encontrado",
                data: undefined,
                error: true
            })
        }
    }

    async getVehicles(req, res) {

        const vehicle = await Car.find().where({ addPor: req.params.addBy })

        if (vehicle) {
            return res.status(200).send({
                status: 200,
                message: "Encontrado com sucesso",
                data: { vehicle },
                error: false
            })
        } else {
            return res.status(404).send({
                status: 404,
                message: "Nada foi encontrado",
                data: undefined,
                error: true
            })
        }
    }

    //SEM TRATAMENTO DE ERRO !!!
    async delete(req, res) {
        const id = req.params.id;
        const itemDeleted = await Pilot.deleteOne().where({ _id: id });
        if (itemDeleted != undefined) {
            res.status(200).send("Item deletado com sucesso")
        } else {
            res.status(400).send("O Item não pôde ser deletado")
        }
    }

    async update(req, res) {
        const { docId, driverName, driverNumber, expirationDate, vehiclePlate } = req.body;
        const slugName = slug(driverName);
        const updatedItem = await Pilot.findOneAndUpdate({ _id: docId }, { driverName, driverNumber, expirationDate, vehiclePlate });
        if (typeof (updatedItem) == "object") {
            res.send("Item atualizado com sucesso")
        } else {
            res.send("Não foi possivel atualizar o item")
        }
    }

    async updateDoc(req, res) {
        const { document } = req.body;
        let result;

        console.log('')
        console.log('body')
        console.log('')
        console.log(req.body)
        console.log('')
        console.log('document')
        console.log('')
        console.log(document)
        console.log('')



        const _id = document._id;

        if (document.namePilot !== undefined) {
            const { _id,
                addBy,
                namePilot,
                telPilot,
                cpfPilot,
                expireCNH,
                expireBuonny,
                expireApisul,
                expireOpentech,
                isActive } = document;

            // console.log("DOCUMENT:")
            // console.log(document)

            result = await Pilot.findOneAndUpdate({ _id }, { ...document, addPor: addBy })

            console.log("RESULT UPDATE PILOT:")
            console.log(result)
        }
        if (document.nameHelper !== undefined) {
            const { _id,
                addBy,
                nameHelper,
                cpfHelper,
                expireBuonny,
                expireOpentech,
                telHelper,
                isActive, } = document;

            result = await Helper.findOneAndUpdate({ _id }, { ...document, addPor: addBy })
        }
        if (document.plateNumber !== undefined) {
            const { _id,
                addBy,
                year,
                plateNumber,
                numANTT,
                expireANTT,
                expireOpentech,
                isSendForBuonny,
                isActive,
                owner
            } = document;

            result = await Car.findOneAndUpdate({ _id }, { ...document, addPor: addBy })
        }
        
        //console.log(result);


        res.status(200).send({
            status: 200,
            message: "Atualizado com Sucesso",
            data: { result },
            error: false
        })
    }
    //Extras
    //Adicionando o estoque do item
    async addStock(req, res) {
        const { id, stock } = req.body;

        // const item = await Item.findOne().where({_id: id});
        // const currentStock = stock + item.stock;
        // console.log(item.name)

        const stockIncreased = await Pilot.findOneAndUpdate({ _id: id }, { $set: { stock } })

        if (stockIncreased != undefined) {
            res.status(200).send("O estoque do item foi armazenado com sucesso");
        } else {
            res.status(400).send("Ocorreu um erro")
        }
    }

    async findDocs(req, res) {

        const { search, userID } = req.body;

        const pilots = await Pilot.find().where(
            {
                addPor: userID,
                namePilot: { $regex: '.*' + search + '.*' },
            }
        );

        /*
        {
            where: {
                addPor: userID,
                $and: [
                    {$or: [{namePilot:{ $regex: '.*' + search + '.*' }}]},
                    {$or: [{cnhPilot: { $regex: '.*' + search + '.*' }}]},
                    {$or: [{expireDate: {$regex: '.*' + search + '.*' }}]},
                    {$or: [{telPilot: {$regex: '.*' + search + '.*' }}]},
                ]
            }
        }
        */




        const helpers = await Helper.find().where({
            addPor: userID,
            nameHelper: { $regex: '.*' + search + '.*' },
        })


        const vehicles = await Car.find().where(
            {
                addPor: userID,
                plateNumber: { $regex: '.*' + search + '.*' },
            }
        );

        const docs = [...pilots, ...helpers, ...vehicles];

        if (docs.length === 0) {
            return res.status(404).send({
                status: 404,
                message: "Nada foi encontrado",
                data: undefined,
                error: true
            })
        } else {
            return res.status(200).send({
                status: 200,
                message: "Encontrado com sucesso",
                data: { docs },
                error: false
            })
        }
    }

    async deleteVehicle(req, res) {
        const id = req.params.id;
        const itemDeleted = await Car.deleteOne().where({ _id: id });

        if (itemDeleted != undefined) {
            res.status(200).send("Item deletado com sucesso")
        } else {
            res.status(400).send("O Item não pôde ser deletado")
        }
    }

    async deleteHelper(req, res) {
        const id = req.params.id;
        const itemDeleted = await Helper.deleteOne().where({ _id: id });

        if (itemDeleted != undefined) {
            res.status(200).send("Item deletado com sucesso")
        } else {
            res.status(400).send("O Item não pôde ser deletado")
        }
    }
}

module.exports = new ItemsController;
