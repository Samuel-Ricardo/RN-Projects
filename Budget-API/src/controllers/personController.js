/*
CREATED BY SAMUEL KEULLEN, 13/01/2021
*/

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../Models/User')
const Budget = require("../Models/Budget")
const Categorie = require("../Models/Categorie")

const AuthConfig = require('../Config/Auth.json')



function generateToken(params){

    token = jwt.sign({id: params.id}, AuthConfig.secret,{
        expiresIn: 86400
    })

    return token
}

function checkAuthentication(params){
    const {user, token} = params

    if(user.authenticationToken!== token){
        return false;
    } else {
        return true;
    }
}

exports.profile = async (req,res) => {

   
    const token = req.token;
    const user = await User.findById(req.userId)

    if(! user){
        return res.status(400).send({ error: "User Not Authenticated or Not Found"})
    }

    if(await checkAuthenticaion({user,token}) === false){
        return res.status(400).send({ error: "User Not Authenticated"})
    }

     res.send({user})
};

exports.logout = async(req, res) => {

    try{
    const user = await User.findByIdAndUpdate(req.userId)

    if(!user){
        return res.status(404).send({ error: "User Not Authenticated or not exists"})
    }

    const token = req.token

    if(await checkAuthentication({user,token})){
        return res.status(400).send({ error: "User Not Authenticated"})
    }
    const {name, email} = req.body
    const newUser = await User.findByIdAndUpdate(
        req.userId,
        {_authenticationToken: ""}
        ,{new: true})

        return res.status(200).send({ newUser})
  }catch(err){
      return res.status(200).send({ err: "Error on try to logout:"+err})
  }
}

exports.updateProfile = async (req,res) => {  

    try{

        const token = req.token
        const user = await User.findById(req.userId)

        if(!user){
            return res.status(404).send({ error: "User Not Authenticated or not exista"})
        }

        if(await checkAuthenticaion({user, token}) === false){

            return res.statu(400).send({ error: "User Not Authenticated"})
        }
        const {name, email} = req.body

        const updatedUser = await User.findByIdAndUpdate(
            { _id: req.userId },
            {
            name,
            email
            }, {new: true})

            return res.status(200).send({updatedUser})

    }catch(err){
       return res.status(200).send({error: "Error: "+ err});
    }
};

exports.questions = async (req, res) => {

    try{

        const token = req.token

        const user = await User.findById(req.userId)

        if(! user){
            return res.status(404).send({ error: "User Not Authenticated or Not Found"})
        }

        if( await checkAuthentication({user,token}) === false){

            return res.status(400).send({ error: "User Not Authenticated"})
        } 
    
        const response_obj = 
        
        [
            
            {
                id : 1,
                question: "Are You ",
                type: 'RADIO',
                category: "unknow",
                data: 
                    [
                        {
                            label: "Single",
                            color: "#1999ED",
                            labelColor: "#1a1917"
                        },
                        {
                            label: "Married",
                            color: "#1999ED",
                            labelColor: "#1a1917"
                        }
                    ]
            },

            {
                id: 2,
                questions: "How much do you make each Month?",
                type: "SELECT",
                category: "amount",
                
            },

            {
                id: 3,
                questions: "How much do you and you spouse make each Month?",
                type: "SELECT",
                category: "amount",
                
            },

            {
                id: 4,
                questions: "How pays for you health?",
                type: "RADIO",
                category: "null",
                data: 
                [
                    {
                        label: "Me",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    },
                    {
                        label: "My Company",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    }
                ]
                
            },

            {
                id: 5,
                questions: "How much do you pay per month?",
                type: "SELECT",
                category: "amount",
            },

            {
                id: 6,
                questions: "Any outstanding hospital bills?",
                type: "RADIO",
                category: "null",
                data: 
                [
                    {
                        label: "Yes",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    },

                    {
                        label: "No",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    }
                ]
            },

            {
                id: 7,
                questions: "How much do you pay per month?",
                type: "SELECT",
                category: "amount",
            },

            {
                id: 8,
                questions: "Do You Have credit card debt?",
                type: "RADIO",
                category: "null",
                data: 
                [
                    {
                        label: "Yes",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    },

                    {
                        label: "No",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    }
                ] 
            },

            {
                id: 9,
                questions: "How much do you pay per month?",
                type: "SELECT",
                category: "amount",
            },

            {
                id: 10,
                questions: "Do You Have Student Loans?",
                type: "RADIO",
                category: "null",
                data: 
                [
                    {
                        label: "Yes",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    },

                    {
                        label: "No",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    }
                ]
            },

        ]

        return res.status(200).send(
            {
                response_obj,
                response_code: 1
        })

    }catch(err){

        console.log(err)

        return res.status(400).send({error: "Erro on try to get questions: "+err})
    }
}

exports.updateBudget = async (req, res) => {

    try {

        // /

        const token = req.token;
        const user = await User.findById(req.userId)

        if(! user){
            return res.status(400).send({ error: "User Not Authenticated or Not Found"})
        }

        if(await checkAuthentication({user,token}) === false){
            return res.status(400).send({ error: "User Not Authenticated"})
        } 

        const {total_amount, categories} = req.body
//
        const budget = await Budget.findOneAndUpdate(req.userId,
            {
                total_amount,
            }, {new: true})

        console.log("")
            console.log("Updating Budget")
            console.log("")
            console.log(budget)
            console.log("")

             budget.categories = []

            await Categorie.deleteMany({budget: budget._id})

            await Promise.all(categories.map(async categorie => {

                const budgetCategorie = new Categorie({... categorie, budget: budget._id})

                await budgetCategorie.save();

                budget.categories.push(budgetCategorie)
            }))

            const new_categories = budget.categories

           const new_budget = await Budget.findOneAndUpdate(req.userId,
            {
                total_amount,
                categories : new_categories

            }, {new: true})

            console.log("")
            console.log("Update Budget")
            console.log("")
            console.log(budget)
            console.log("")

       return res.status(200).send( 
            {
                response_obj: new_budget,
                error: false,
                authorization: true,
                response_code: 1,
            } )
        

    } catch (err) {
        
        console.log(err)
        
        res.status(400).send({error: "Error on create budget: "+err})
    }

 }

exports.createBudget = async (req, res) => {

    try {

        const token = req.token;
        const user = await User.findById(req.userId)

        if(! user){
            return res.status(400).send({ error: "User Not Authenticated or Not Found"})
        }

        if(await checkAuthentication({user,token}) === false){
            return res.status(400).send({ error: "User Not Authenticated"})
        } 

        const {total_amount, categories} = req.body

        const budget = await Budget.create({
            total_amount,
            user: req.userId
        })

        await Promise.all(categories.map(async categories => {

            const budgetCategories = new Categorie ({...categories,
                                                         budget: budget._id})

            await budgetCategories.save();

            budget.categories.push(budgetCategories)
        }))


        await budget.save()

        res.status(200).send({budget})

    } catch (err) {
        
        console.log(err)
        
        res.status(400).send({error: "Error on create budget: "+err})
    }

 }
 
 exports.budget = async (req, res) => {

    try {

        const token = req.token

        const user = await User.findById(req.userId)

        if(! user){
            return res.status(404).send({ error: "User Not Authenticated or Not Found"})
        }

        if( await checkAuthentication({user,token}) === false){

            return res.status(400).send({ error: "User Not Authenticated"})
        } 
    
        let budgets = await Budget.findOne({user: req.userId}).populate(['user', 'categories'])

        if (budgets === null || !budgets || budgets === undefined) {

                
               const total_amount= 1000
               const categories= [
                    { is_locked: false, title: "tax", percentage: "10.00", amount: "100"},
                    
                    { is_locked: false, title: "loan", percentage: "10.00", amount: "100"},
                    
                    { is_locked: false, title: "Miojo Brabo", percentage: "10.00", amount: "100"},
                    
                    { is_locked: false, title: "healthcare", percentage: "10.00", amount: "100"},
                    
                    { is_locked: false, title: "insurance", percentage: "10.00", amount: "100"},
                    
                    { is_locked: false, title: "spendable", percentage: "50.00", amount: "500"}
                ] 
            
            budgets = await Budget.create({
            total_amount,
            user: req.userId
        })

        await Promise.all(categories.map(async categories => {

            const budgetCategories = new Categorie ({...categories,
                                                         budget: budgets._id})

            await budgetCategories.save();

            budgets.categories.push(budgetCategories)
        }))


        await budgets.save()
        }

        console.log("")
        console.log("Budget")
        console.log("")
        console.log(budgets)
        console.log("")

        return res.status(200).send( 
            {
                response_obj: budgets,
                error: false,
                authorization: true,
                response_code: 1,
            } )
        
    } catch (err) {
        
        console.log(err)
        
        res.status(400).send({error: "Error on find budgets: "+err})
    }
}