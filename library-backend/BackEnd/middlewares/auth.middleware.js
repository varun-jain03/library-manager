const express = require('express');
const jwt = require('jsonwebtoken');
const { blacklist } = require('../blacklist.js')
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (blacklist.includes(token)) {
            return res.status(401).send("Invalid token. Please login first!")
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).send("Invalid token. Please login first!")
            }
            else {
                req.userId = decoded.userId
                req.userEmail = decoded.userEmail
                next();
            }
        })

    } catch (error) {
        res.json({ msg: 'there has been error connecting to DB', error })
        console.log(error);
    }
}

module.exports = { authMiddleware };