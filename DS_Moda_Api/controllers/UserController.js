const User = require("../models/User");
const Purchase = require("../models/Purchase");
const Item = require("../models/Item");

const bcrypt = require("bcrypt");
var fs = require('fs');
var jwt = require("jsonwebtoken");
const ServicesController = require("../controllers/ServicesController");

var default_messages = require('../config/default_messages')

//AuthConfig.secret
var secret = "SKLINFOTECH"

function generateToken(params) {

    let token = null

    if (params.remindMe === true) {

        token = jwt.sign({id: params.id}, secret)

    } else {
        token = jwt.sign({id: params.id}, secret,{expiresIn:86400})
    }

    return token
}

function checkAuthentication(params) {

    const {user, token} = params

    if (user.authenticationToken !== token) {

        return false;
    } else {
        return true;
    }

}


class UserController{

    //CRUD base
    async list(req, res){
        const users = await User.find({});
        console.log("acesso")
        res.status(200).send(users);
    }

    async getUser(req,res){
        const id = req.params.id;

        const user = await User.findOne().where({_id:id});

        res.send(user);
    }

    async create(req, res) {

        const { name , email , password , number, isAdmin } = req.body;

        const userAlreadyExists = await User.findOne().where({ email });

        //Tratamento de erros
        if (userAlreadyExists) {

            res.status(400).send(default_messages.email_repeated);
        } else {

            if (password == "" || password == undefined || password == " ") {

                res.status(400).send(default_messages.password_null);
            } else {

                //Salvando o usuário
                const hash = await bcrypt.hash(password, 10);
                const savedUser = await User.create({
                    name,
                    email,
                    number,
                    password: hash,
                    isAdmin
                })

                const authenticationToken = generateToken({id: savedUser._id, remindMe: true})

                const user = await User.findByIdAndUpdate(
                    savedUser._id,
                    { authenticationToken },
                    { new: true }
                )

                if (user != undefined) {

                    const data = {
                        message: default_messages.user_saved,
                        user,
                        authenticationToken,
                        error: false,
                    }

                    res.status(200).send({...data})

                    console.log(savedUser)
                } else {

                    res.status(400).send({error: default_messages.user_create_error})
                }
            }
        }
    }

    async delete(req, res){
        const { id, email } = req.params;//Possivel confirmação da senha para deletar conta*
        const userExists = await User.deleteOne().where({ _id: id });

        if (userExists != undefined) {
            res.status(200).send(default_messages.user_deleted)
        } else {
            res.status(400).send(default_messages.user_delete_error)
        }

    }

    async update(req, res){
        const { userId, name , email , number, isAdmin} = req.body;

        const updatedUser = await User.findOneAndUpdate({_id: userId},{name , email,number,isAdmin});
        if(updatedUser == "object"){
            res.send("Usuário atualizado com sucesso");
        }else{
            res.send("Usuário não foi atualizado")
        }
    }

    //Complementos
    async login(req, res) {

        const { email , password} = req.body;
        const user = await User.findOne().where({ email }).select('+password');

        if (user != undefined) {

            const passwordHash = await bcrypt.compare(password, user.password)

            console.log(passwordHash)

            if(passwordHash){

                     var token = jwt.sign({ email : user.email, isAdmin: user.isAdmin}, secret)

                    //const authenticationToken = generateToken({id: user._id, remindMe: remindMe})
                    console.log(token);

                    res.status(200).send({error: false, token, user})
                }else{
                res.status(400).send({ error: default_messages.password_not_found})
            }
        }else{
            res.status(400).send({error: default_messages.email_not_found})
        }
    }

    async recoveryPassword(req, res){
        const { email } = req.body;
        const userInfo = await User.findOne().where({ email });
        //Verificação de existencia de email
        if(userInfo == null){
            res.status(404).send("Não existe usuário com esse email cadastrado")
        }else{
            const token = jwt.sign({id: userInfo.id, name: userInfo.name}, secret,{expiresIn:300})
            ServicesController.sendEmail(userInfo, token);
            res.status(200).send({error: false})

            //res.status(200).send("Foi enviado um email contendo instruções para recuperação da senha")
        }
    }

    async tokenVerification(req, res){
        const  token  = req.params.token;

        var decoded = jwt.verify(token,secret, (err , result)=>{
            if(err){
                res.send("Tempo expirado, por favor retorne a aplicação e repita o processo")
                return false;
                //EJS para o erro
            }
            return result;
            //return res.status(200).send({err, result})
        });
        const userId = decoded.id;
        const userName = decoded.name;
        if(decoded){
            res.render("recoverPassword",{ userId , userName});
        }
    }

    async updatePassword(req, res){
        const { userId , password} = req.body;
        console.log(userId, password);  
        
        const hash = await bcrypt.hash(password, 10);
           const updatedPassword = await User.findOneAndUpdate({_id: userId}, {password: hash},{useFindAndModify: false});
           //Conferir se o token ja foi usado "PasswordToken Model"
        // const updatedPassword = await User.updateOne({
        //     $set:{
        //         password: hash
        //     }
        // }).where({ _id: userId});

        
        res.render("success")
    }

    async userHistory(req, res){
        const { userId } = req.body;
        const userHistory = await Purchase.find().where({ userId });
        res.send(userHistory);
    }

    async favoriteItems(req, res){
        const { itemId, userId } = req.body;

        const userInfo = await User.findOne({_id: userId});
        //res.json({userInfo})
        const info = userInfo.favoriteItems.map(async (data)=>{
            if(data == itemId){
                const unfavoriteItem = await User.updateOne({_id : userId}, {$pull : {favoriteItems:itemId}});//Zera os favoritos de 1 usuário 
                const unfavoritedUser = await Item.updateOne({_id : itemId}, {$pull : {favoritedBy:userId}});//Zerar o contador de favoritados do item
                return res.json({message:"Item desfavoritado"})
            }
        })
        
        if(info.length == 0){
            const saveFavorite = await User.findOneAndUpdate({_id: userId},{$push: {favoriteItems:itemId }});
            const favoritedBy = await Item.findOneAndUpdate({_id: itemId},{$push: {favoritedBy:userId }});
            return res.json({message:"Item favoritado"})
        }

        
        //const saveFavorite = await User.findOneAndUpdate({_id: userId},{$push: {favoriteItems:itemId }});
        //const favoritedBy = await Item.findOneAndUpdate({_id: itemId},{$push: {favoritedBy:userId }});

        //const unfavoriteItem = await User.updateOne({_id : userId}, {$pull : {favoriteItems:itemId}});//Zera os favoritos de 1 usuário 
        //const unfavoritedUser = await Item.updateOne({_id : itemId}, {$pull : {favoritedBy:userId}});//Zerar o contador de favoritados do item

    }
    async getFavorites(req, res){
        const userId = req.params.id;
        console.log(userId);
        const userInfo = await User.findById({_id: userId});
        const userFavs = userInfo.favoriteItems;
        res.json({ userFavs});
    }

    
}

module.exports = new UserController;
