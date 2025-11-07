const express = require('express');
const jwt = require('jsonwebtoken');
const { BookModel } = require('../models/book.model.js');

const bookRoutes = express.Router();

bookRoutes.get('/', async (req, res) => {
    try {
        const books = await BookModel.find();
        res.send({"BOOKS" : books})
    } catch (error) {
        res.json({msg:'there has been error connecting to DB', error})
        console.log(error);
    }
})

bookRoutes.post('/', async (req, res) => {
    try {
        const newBook = new BookModel(req.body);
        await newBook.save();
        res.json({ msg: "the new book has been added" })
    } catch (error) {
        res.json({msg:'there has been error connecting to DB', error})
        console.log(error);        
    }
})

module.exports = bookRoutes;