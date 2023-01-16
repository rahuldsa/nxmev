const express = require('express')
const { userModel } = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userRouter = express.Router()

userRouter.post('/register', async (req, res) => {
    const { name, email, gender, password } = req.body
    try {
        bcrypt.hash(password, 5, async (err, secure_password) => {
            if (err) {
                console.log(err);
            } else {
                const user = new userModel({ name, email, gender, password: secure_password })
                await user.save()
                res.send('registerd')
            }
        })
    } catch (err) {
        res.send('error in registering the user')
        console.log(err);
    }
})

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.find({ email })
        console.log(user);
        const hashed_password = user[0].password
        if (user.length > 0) {
            bcrypt.compare(password, hashed_password, (err, result) => {
                // console.log(password, hashed_password, result);
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, 'masai')
                    res.send({ 'msg': 'login successfull,', token: token })
                } else {
                    res.send('wrong credentials')
                }
            })
        } else {
            res.send('wrong credentials 2')
        }
    } catch (err) {
        res.send('something went wrong')
        console.log(err);
    }
})

module.exports = {
    userRouter
}