const Correios = require("node-correios");
const correios = new Correios();
const frete = require('frete');
const Purchase = require("../models/Purchase");
const ejs = require("ejs");
const nodemailer = require('nodemailer');
const transporter = require("../config/nodemailerConfig");
require('dotenv').config()
class ServicesController{


    async freteCalc(req, res){
        const { cep } = req.body;

        frete()
        .cepOrigem('01526000')
        .peso(1)
        .formato(frete.formatos.caixaPacote)
        .comprimento(16)
        .altura(2)
        .largura(11)
        .diametro(1)
        .maoPropria("nao")
        .valorDeclarado(50)
        .avisoRecebimento("sim")
        .servico(frete.servicos.sedex)
        .precoPrazo(cep).then(result =>{
            res.status(200).send(result);
        }).catch(err =>{
            res.status(400).send(err);
        })
     

    }

    async frete(cep){
        
        var cepValue = 312;
        const freteInfo = await frete()
        .cepOrigem('01526000')
        .peso(1)
        .formato(frete.formatos.caixaPacote)
        .comprimento(16)
        .altura(2)
        .largura(11)
        .diametro(1)
        .maoPropria("nao")
        .valorDeclarado(50)
        .avisoRecebimento("sim")
        .servico(frete.servicos.sedex)
        .precoPrazo(cep).then(result =>{
            cepValue = parseFloat(result[0].valor);
            return cepValue
        }).catch(err =>{
            return (err);
        })
        
        return cepValue;
    }

    async prazoDia(req, res){
        const { cep} = req.body;

        const fretePrazo = frete()
            .cepOrigem('01526000')
            .servico(frete.servicos.sedex)
            .prazo(cep).then(result =>{
                return result;
            }).catch(err =>{
                return err;
            });

        res.send(fretePrazo)

    }

    verificarCep(req, res){
        const { cep } = req.body

        correios.consultaCEP({ cep }).then(result => {

            return res.json({result})

        }).catch(error => {

            return res.json(error)

        })
    }

    async sendEmail(userInfo, token){
        //const userEmail = "Dsmodafitnnes@gmail.com"
        const userName = userInfo.name;
        const userEmail = userInfo.email;
        console.log(userEmail);
        transporter;//
        ejs.renderFile("views/email.ejs",{userName, token},(err, data)=>{
            if(err){
                console.log(err)

            }else{

                let mailOptions = {
                    from: 'Dsmodafitnnes@gmail.com', 
                    to: userEmail, 
                    subject: 'Acesso a DS MODAS',
                    text: 'Olá',
                    html: data,
                    context: {
                        name: 'Accime Esterling'
                    } 
                };

                transporter.sendMail(mailOptions).then(message =>{
                    console.log(message)
                }).catch(err =>{
                    console.log(err)
                })
            }
        })   
    }

    async payPurchase(req, res){
        const { purchaseId } = req.body;
        const purchase = await Purchase.findOne({_id: purchaseId});
        res.send(purchase)
    }

}

module.exports = new ServicesController();