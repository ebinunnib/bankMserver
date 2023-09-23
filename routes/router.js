//&&&&&&&&&&&&&&&&&&&&&&&&00000000000000&&&&&&&&&&&&&&&

//1importing express
const express = require('express')
const { register, login, getBalance,moneyTransfer, accountStatement,deleteUser } = require('../controllers/logic')
const { jwtMiddleware } = require('../middilewares/jwtmiddlewares')


//router object
const router = new express.Router()


//create a/c-signUp

router.post('/bankuser/create_acc', register)

//login
router.post('/bankuser/login', login)

//balance check

router.get('/bankuser/balance/:acno', getBalance)

//money transfer

router.post('/bankuser/money-transfer',moneyTransfer)

//accountstatement
router.get('/bankuser/account-statement/:acno',accountStatement)


//delete a/c
router.delete('/bankuser/delete-account/:acno',deleteUser)


//export router...

module.exports = router
