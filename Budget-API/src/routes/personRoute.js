/*
CREATED BY SAMUEL KEULLEN, 13/01/2021
*/
const express = require('express');
const router = express.Router();
const controller = require('../controllers/personController')
const AuthMiddleware = require('../Middleware/auth')

router.use(AuthMiddleware)

//router.get('/', controller.get);
//router.get('/:id', controller.getById);
//router.post('/', controller.post);
//router.put('/:id', controller.put);
//router.delete('/:id', controller.delete);

//router.post('/budget/update', controller.post);
//router.post('/notification/status', controller.post);
//router.post('/notification/status/update', controller.post); TO REINICIANO O CELL, TAVA UMA TARTARUGA

//API Parameters

//HomeService.js
router.get('/questions', controller.questions);
router.get('/categories', controller.budget);
//router.get('/posts', controller.get);
//router.get('/states', controller.get);

router.get('/budget', controller.budget);
router.post('/budget/create', controller.createBudget);
router.post('/budget/update', controller.updateBudget);

//AuthService.js
//router.post('/versioncheck', controller.post); 
router.post('/logout', controller.logout);
//router.post('/isuser', controller.get);
//router.post('/captureinfo', controller.post);
//router.post('/sociallogin', controller.post);
//router.post('/profile', controller.post);
//router.put('/updateprofile', controller.put);
//router.post('/gettc', controller.post);
//router.post('/contact', controller.post);


module.exports = router;
