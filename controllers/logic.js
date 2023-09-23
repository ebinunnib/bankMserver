const users = require("../models/collections")
const jwt=require('jsonwebtoken')


//register account creation
register = (req, res) => {
    //acno=req.body.acno
    // const {acno}=req.body

    //psw=req.body.acno
    //    const {psw}=req.body


    // uname=req.body.uname
    // const {uname}=req.body


    //destructuring_______
    const { acno, psw, uname } = req.body

    // accound creating time check user already exist or not
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(400).json({

                message: "user already exist",
                status: false,
                statusCode: 400

            })
        } else {
            //create object for user
            let newUser = new users({
                acno,
                psw,
                uname,
                balance: 0,
                trasaction: []
            })
            //save in db
            newUser.save()
            res.status(201).json({

                message: "user created successfull",
                status: true,
                statusCode: 201

            })
        }
    })

}

//lgin logic creation
login = (req, res) => {
    //access data from request body
    const { acno, psw } = req.body
    users.findOne({ acno, psw }).then(user => {
        if (user) {
            const token=jwt.sign({acno},"secretkey123")
            res.status(200).json({
                message: "login success",
                status: true,
                statuscode: 200,
                currentUser: user.uname,token
                
            })
        } else {
            res.status(404).json({
                message: "User not Fount",
                status: false,
                statuscode: 404
            })
        }
    })
}
getBalance = (req, res) => {
    //access acno from request params
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                message: user.balance,
                status: true,
                statuscode: 200

            })
        }
        else {
            res.status(404).json({
                message: "User not found",
                status: false,
                statuscode: 404
            })
        }
    })



}
moneyTransfer = (req, res) => {
    const { rAcno, sAcno, amount, psw, date } = req.body
    //convert amount to number
    var amnt = parseInt(amount)
    //check senter details
    users.findOne({ acno: sAcno, psw }).then(suser => {
        if (suser) {
            //check recever details in db
            users.findOne({ acno: rAcno }).then(ruser => {
                if (ruser) {
                    //check amount with sender balance
                    if (amnt <= suser.balance) {
                        suser.balance = suser.balance - amnt
                        suser.transaction.push({ tacno: rAcno, amound: amnt, type: "DEBIT", date })
                        suser.save()

                        //update recever object
                        ruser.balance = ruser.balance + amnt
                        ruser.transaction.push({ tacno: rAcno, amound: amnt, type: "CREDIT", date })
                        ruser.save()

                        res.status(200).json({
                            message: "transaction successfull",
                            status: true,
                            statuscode: 200

                        })


                    } else {
                        res.status(406).json({
                            message: "insufficient balance ",
                            status: false,
                            statuscode: 406
                        })

                    }

                } else {
                    res.status(404).json({
                        message: "invalid credit credential",
                        status: false,
                        statuscode: 404
                    })

                }
            })

        } else {
            res.status(404).json({
                message: "invalid debit credential",
                status: false,
                statuscode: 404

            })

        }

    })
}
accountStatement = (req, res) => {
    const { acno } = req.params
    users.findOne({ acno }).then(user => {

        if (user) {
            res.status(200).json({
                message: user.transaction,
                status: true,
                statuscode: 200

            })


        } else {
            res.status(404).json({
                message: "User not Fount",
                status: false,
                statuscode: 404
            })


        }
    })
}
deleteUser=(req,res)=>{
    const {acno} = req.params
    users.deleteOne({acno}).then(data=>{
        if(data){
            res.status(200).json({
                message:"Deleted",
                status:true,
                statusCode:200
            })
        }
    })
}
module.exports = { register, login, getBalance, moneyTransfer, accountStatement,deleteUser, }

