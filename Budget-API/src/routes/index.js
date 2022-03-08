/*
CREATED BY SAMUEL KEULLEN, 13/01/2021
*/
const express = require('express');
const router = express.Router();


const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../Models/User')
const Budget = require('../Models/Budget')
const Questions = require('../Models/Questions')
const Categorie = require('../Models/Categorie')
const AuthConfig = require('../Config/Auth.json')



function generateToken(params){

    token = jwt.sign({id: params.id}, AuthConfig.secret,{
        expiresIn: 86400
    })

    return token
}

async function createDefaultBudget(params) {
    

        const total_amount = 1000 
        const categories = [
            
            { is_locked: false, title: "tax", percentage: "10.00", amount: "100" },
              
            { is_locked: false, title: "loan", percentage: "10.00", amount: "100" },
              
            { is_locked: false, title: "creditcard", percentage: "10.00", amount: "100" },
              
            { is_locked: false, title: "healthcare", percentage: "10.00", amount: "100" },
              
            { is_locked: false, title: "insurance", percentage: "10.00", amount: "100" },
              
            {is_locked: false, title: "spendable", percentage: "50.00", amount: "500"}
           ] 

    const budget = await Budget.create({
        total_amount: total_amount,
        user: params.user_id
    })

    await Promise.all(categories.map(async categories => {

        const budgetCategories = new Categorie ({...categories,
                                                     budget: budget._id})

        await budgetCategories.save();

        budget.categories.push(budgetCategories)
    }))


    console.log("")
    console.log("Salvando budegt")
    console.log("")

    console.log(budget)

    await budget.save()

    return budget
}

router.get('/', function (req, res, next) {
    username = "",
    userid = 0 ,
    message="",
    nessage2 = ""
    res.status(200).send({
        message:" Welcome to the Simple Budget App API",
        message2: "navigate by url, we have a second page"
    })
});


router.get('/questions', async(req, res) => {
//console.log(" /questions OK");
 try {
     const userId = req.userId
   
   const user = await User.findById(req.userId)

      const qst = await Questions.find({user: req.userId}).populate(['user', 'array'])//retornando nada 
     if(!qst) {

        return res.status(400).send({error: 'Question Not Found'}) 
     }

        response_code = 1
        //response_obj = qst 
        const response_obj = 
        
        [
            
            {
                id : 1,
                question: "Are You ",
                type: 'RADIO',
                category: "unknow",
                next : 2,
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
                id: 2,//colocar radio dnv caso erro
                question: "How much do you make each Month?",
                type: 'RADIO',
                category: "answer",
                next: 3,
                data: 
                    [
                        {
                            label: "100",
                            color: "#1999ED",
                            labelColor: "#1a1917"
                        },
                        {
                            label: "200",
                            color: "#1999ED",
                            labelColor: "#1a1917"
                        },
                        {
                            label: "300",
                            color: "#1999ED",
                            labelColor: "#1a1917"
                        },
                        {
                            label: "400",
                            color: "#1999ED",
                            labelColor: "#1a1917"
                        }
                    ]
            },

            {
                id: 3,
                question: "How much do you and you spouse make each Month?",
                type: "RADIO",
                category: "answer",
                next: 4,
                data: 
                [
                    {
                        label: "100",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    },
                    {
                        label: "200",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    },
                    {
                        label: "300",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    },
                    {
                        label: "400",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    }
                ]
            },

            {
                id: 4,
                question: "How pays for you health?",
                type: "RADIO",
                category: "unknow",
                next: 5,
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
                question: "How much do you pay per month?",
                type: "RADIO",
                category: "answer",
                next: 6,
                data: 
                [
                    {
                        label: "100",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    },
                    {
                        label: "200",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    },
                    {
                        label: "300",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    },
                    {
                        label: "400$+",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    }
                ]
            },

            {
                id: 6,
                question: "Any outstanding hospital bills?",
                type: "RADIO",
                category: "unknow",
                next: 7,
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
                question: "How much do you pay per month?",
                type: "RADIO",
                category: "answer",
                next: 8,
                data: 
                [
                    {
                        label: "100",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    },
                    {
                        label: "200",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    },
                    {
                        label: "300",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    },
                    {
                        label: "400",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    }
                ]
            },

            {
                id: 8,
                question: "Do You Have credit card debt?",
                type: "RADIO",
                category: "unknow",
                next: 9,
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
                question: "How much do you pay per month?",
                type: "RADIO",
                category: "answer",
                next: 10,
                data: 
                [
                    {
                        label: "100",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    },
                    {
                        label: "200",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    },
                    {
                        label: "300",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    },
                    {
                        label: "400",
                        color: "#1999ED",
                        labelColor: "#1a1917"
                    }
                ]
            },

            {
                id: 10,
                question: "Do You Have Student Loans?",
                type: "RADIO",
                category: "unknow",
                next: null,
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
                ],

            }

        ]

        return res.send({
            response_code,
            response_obj,
            is_fetching : true

        })
    } catch (err) {
        return res.status(400).send({error: "GET Question failed: "+err, response_code: 0})           
    }   
    
});
router.get('/categories', function(req, res, next) {

    
//    const budget_categories [
//        {
//            title,
//            percentage
//            amount
//        }
//    ]
    
res.status(200).send({
       
    })
    
});
router.get('/posts', function(req, res, next) {
  // console.log(" /posts OK"); 
  res.status(200).send({
       
    })
});
router.get('/states', function(req, res, next) {
    //console.log(" /states OK");
    res.status(200).send({
        
    })
});

router.post('/update', function(req, res, next) {
    
});

router.post('/budget/update', async(req, res) => {
   //console.log(" /budget/update OK");
   const {budget} = req.body  
      
   try {


       if(await Budget.findOne({ budget })){

           return res.status(400).send({error: 'User already exists'})
       }

       const budge = await Budget.create(req.body)
       response_obj = budge
       response_code = 1

       return res.send({
           response_obj,
           response_code
       })
   } catch (err) {
       return res.status(400).send({error: "Registration failed: "+err, response_code: 0})           
   }     
});

//tava /budget
router.get('/budget', async(req, res) => {
   //console.log(" /budget OK");
   try {
  //const userId = req.userId
   
  // const user = await User.findById(req.userId)
     
    // const budget = await Budget.find({user: req.userId}).populate(['user', 'budget'])
    
    const budget = {
        
        total_amount: 1000, 
        categories: [
               {id: 1, is_locked: false, title: "tax", percentage: "10.00", amount: "100"},
               {id: 2, is_locked: false, title: "loan", percentage: "10.00", amount: "100"},
               {id: 3, is_locked: false, title: "creditcard", percentage: "10.00", amount: "100"},
               {id: 4, is_locked: false, title: "healthcare", percentage: "10.00", amount: "100"},
               {id: 5, is_locked: false, title: "insurance", percentage: "10.00", amount: "100"},
               {id: 6, is_locked: false, title: "spendable", percentage: "50.00", amount: 500}
           ] 
        }
    
    if(!budget) {

        return res.status(400).send({error: 'Budget Not Found'})
     }

    response_obj = budget
    authorization = true
    response_code = 1

     res.send({
       authorization,
       response_obj,
       response_code
     })
   }catch(err){


        res.status(400).send({error: "Error on GET Budgets: "+err});

    }
});

/*
ACCOUNTS
*/

router.post('/versioncheck', function(req, res, next) {
    //console.log(" /versionCheck OK");
    res.status(200).send({
        
    })
});

router.post('/logout', function(req, res, next) {
   //console.log(" /logout OK");
   res.status(200).send({
        
    })
});

router.post('/login', async (req, res) => {

    try{

    const {email, password} = req.body;

        const user = await User.findOne({email}).select('+password')

        if(!user){

            return res.status(400).send({error: 'User Not Found'})
        }

        if( await bcrypt.compare( password, user.password) === false){
            return res.status(400).send({error: 'Invalid Password'})
        }

        const authenticationToken = await generateToken({id: user.id})

        const newUser = await User.findByIdAndUpdate(user._id,{ authenticationToken }, {new: true})

        user.password = undefined

        jwt_token = authenticationToken
        response_obj = newUser
        response_code = 1
        

        res.send({
            response_obj,
            jwt_token,
            response_code
        });

    }catch(err){

        res.status(400).send({error: "Error on Authenticate: "+err});

    }
});

//router.post('/budget-app/api/accounts/registration', async (req, res) => {
router.post('/signup', async (req, res) => {  

    const {email} = req.body  
      
    try {


        if(await User.findOne({ email })){

            return res.status(400).send({error: 'User already exists'})
        }

        const user = await User.create(req.body)

        authenticationToken = await generateToken({id: user.id})

        await user.update({authenticationToken})

        user.password = undefined

        auth_user = user
        jwt_token = authenticationToken
        response_obj = user
        response_code = 1

        const user_id = user._id
          
        const budget = await createDefaultBudget({user_id: user_id})

        return res.send({
            response_obj,
            jwt_token,
            response_code,
            budget
        })
    } catch (err) {
        return res.status(400).send({error: "Registration failed: "+err, response_code: 0})           
    }     
});

router.post('/isuser', function(req, res, next) {
  //console.log(" /isuser OK");
  res.status(200).send({
        
    })
});

router.post('/captureinfo', function(req, res, next) {
    //console.log(" /captureinfo OK");
    res.status(200).send({
        
    })
});

router.post('/forgotpassword', async (req, res) => {
    //console.log(" /forgotpassword OK");
    

        const { user_email } = req.body;

        try {
            
            const user = await User.findOne({ user_email });

            if(!user)
            return res.status(400).send({ error: "User Not Found"});

            const token = crypto.randomBytes(20).toString('hex')

            const now = new Date();
            now.setHours(now.getHours() + 1);

            await User.findByIdAndUpdate(user.id, {
                '$set':{
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            })

            Mailer.sendMail({

                to: email,
                from: 'Budget App <mailsend71@gmail.com>',
                text: 'Use the token to recover the password ;)',
                subject:"Recover the password",
                template:'Auth/forgot-password',
                context: { token }
            },(err) =>{

                if(err)
                return res.status(400).send({ error: "Cannot Send Forgot Password Email:"+err})

                return res.status(200).send({
                    to: email,
                    from:"mailsend71@gmail.com",
                    subject:"Recover the password"
                })
            })

            console.log(token, now);

        } catch (err) {
            return res.status(400).send({ error: 'Error: ' +err+ "Try Again"})
        }
});

router.post('/sociallogin', function(req, res, next) {
    //console.log(" /sociallogin OK");
});

router.post('/profile', async (req, res) => {

    try{

        const {user_email, user_name} = req.body;
    
            const user = await User.findOne({user_email}).select('+user_name')
    
            if(!user){
    
                return res.status(400).send({error: 'User Not Found'})
            }
    
            response_obj = user
            response_code = 1
            
    
            res.send({
                response_obj,
                response_code
            });
    
        }catch(err){
    
            res.status(400).send({error: "Error on Authenticate: "+err});
    
        }
    });

router.put('/updateprofile', function(req, res, next) {
    //console.log(" /updateprofile OK");
    res.status(200).send({
       
    })
});

router.post('/changepassword', async (req, res) => {

    try {
        
        const { email, password, token} = req.body
    
    const user = await User.findOne({email}).select("+passwordResetToken passwordResetExpires")
    
    if(! user)
            return res.status(400).send({ error: 'User Not Found'});

    if(! token === user.passwordResetToken)
        return res.status(400).send({error: "Token Invalid"})

    now = new Date();

    if( now > user.passwordResetExpires)
      return res.status(400).send({error: "Token Expires"})

    user.password = password;

      user.save()

    return res.status(200).send({response_code : 1})

    } catch (err) {
        
        return res.status(400).send({error: "Erro at try to change password"+err, response_code : 0})
    }

});

router.post('/gettc', function(req, res, next) {
   //console.log(" /gettc OK");
   res.status(200).send({
       
    })
});

router.post('/contact', function(req, res, next) {
    //console.log(" /contact OK");
    res.status(200).send({
        
    })
});

router.post('/status', function(req, res, next) {
    //console.log(" /status OK");
    res.status(200).send({
        username : "test",
        userid :1
    })
});

router.post('/status/update', function(req, res, next) {
    //console.log(" /status/update OK");
    res.status(200).send({
        username : "test",
        userid :1
    })
});


module.exports = router;
