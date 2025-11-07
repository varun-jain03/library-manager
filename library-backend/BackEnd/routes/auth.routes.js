const express = require('express');
const bcrypt = require('bcrypt');
const { UserModel } = require('../models/user.model.js');
const { model } = require('mongoose');
const jwt = require('jsonwebtoken');
const { blacklist } = require('../blacklist.js');
require('dotenv').config();
const authRoutes = express.Router();
const { authMiddleware } = require('../middlewares/auth.middleware.js');

//new user added
authRoutes.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        bcrypt.hash(password, Number(process.env.SALTROUNDS), async (err, hash) => {
            if(hash) {
                const newUser = new UserModel({email, password: hash});
                await newUser.save();
                res.json({ msg:"new user has been registered" })
            }
            else {
                res.json({ msg:"there is some problem", err })
                console.log(err)
            }
        })
    } 
    catch (error) {
        res.json({msg:'there has been error connecting to DB', error})
        console.log(error);
    }
})

//user authenticated
authRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const matchingUser = await UserModel.findOne({email});
        if (matchingUser) {
            const isMatching = await bcrypt.compare(password, matchingUser.password);
            if (isMatching) {
                const token = jwt.sign({ 
                    userId: matchingUser._id,
                    userEmail: matchingUser.email
                },
                process.env.SECRET_KEY);
                res.json({ msg:"login successfull", token: token })
            } else{
                res.json({ msg: "incorrect password entered!" })
            }
        } else {
            res.json({ msg: "incorrect email entered!"})
        }
    } catch (error) {
        res.json({ msg:"error while connecting to DB", error })
        console.log(error);
    }
})

//user logged out
authRoutes.get('/logout', (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    blacklist.push = token;
    res.json({ mag: "The user has been logged out" });
})

authRoutes.get('/me', authMiddleware, async (req, res) => {
    const userId = req.userId;
    try {
        const matchedUser = await UserModel.findOne({_id: userId});
        res.json({msg:"this user is logged in", matchedUser})
        

    } catch (error) {
        res.json({ msg:"not able to connect to the DB", error});
        console.log(error);
    }
})

module.exports = { authRoutes };