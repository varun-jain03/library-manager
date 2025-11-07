const mongoose = require('mongoose');
const express = require('express');
const { authMiddleware } = require('../middlewares/auth.middleware.js');
const { MyBookModel } = require('../models/myBook.model.js');
const { UserModel } = require('../models/user.model.js');


const myBookRoutes = express.Router();

myBookRoutes.get('/', authMiddleware, async (req, res) => {
    const userId = req.userId; // comes from authMiddleware
    try {
        const books = await MyBookModel.find({ userId })
            .populate('bookId') // populate book details

        res.json(books);
    } catch (error) {
        console.error("Error fetching my books:", error);
        res.status(500).json({
            msg: 'Error fetching your books',
            error: error.message
        });
    }
});

myBookRoutes.post('/:bookId', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const { bookId } = req.params;
    const { readingStatus, rating } = req.body; // example expected fields

    try {
        // Check if the book already exists in user's collection
        const existingBook = await MyBookModel.findOne({ userId, bookId });
        if (existingBook) {
            return res.status(400).json({ msg: "Book already added to the user's collection" });
        }

        // Create new book record
        const newMyBook = new MyBookModel({
            userId,
            bookId,
            readingStatus,
            rating
        });

        await newMyBook.save();
        res.status(201).json({
            msg: "Book added to user's collection",
            book: newMyBook
        });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({
            msg: 'Error adding the book to the user',
            error: error.message
        });
    }
});

myBookRoutes.delete('/:bookId', authMiddleware, async (req, res) => {
    const { bookId } = req.params;

    try {
        const deleted = await MyBookModel.findOneAndDelete({
            userId: req.userId,
            bookId
        });

        if (!deleted) {
            return res.status(404).json({ msg: "Book not found in user's list" });
        }

        res.json({ msg: "Book removed successfully", data: deleted });
    } catch (error) {
        console.error("Error removing book:", error);
        res.status(500).json({
            msg: 'Error removing book from user list',
            error: error.message
        });
    }
});

myBookRoutes.patch('/:bookId', authMiddleware, async (req, res) => {
    const { bookId } = req.params;
    const { status, rating } = req.body;

    try {
        // Build dynamic update object
        const updateFields = {};
        if (status !== undefined) updateFields.status = status;
        if (rating !== undefined) updateFields.rating = rating;

        const updated = await MyBookModel.findOneAndUpdate(
            { userId: req.userId, bookId },
            updateFields,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ msg: "Book not found in user's list" });
        }

        res.json({ msg: "Book updated successfully", data: updated });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({
            msg: 'Error updating book',
            error: error.message
        });
    }
});

// myBookRoutes.patch('/:bookId/status', authMiddleware, async (req, res) => {
//     const { bookId } = req.params;

//     try {
//         const updated = await MyBookModel.findOneAndUpdate(
//             { userId: req.userId, bookId },
//             { status: req.body.status },
//             { new: true }
//         );

//         if (!updated) {
//             return res.status(404).json({ msg: "Book not found in user's list" });
//         }

//         res.json({ msg: "Status has been updated", data: updated });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             msg: 'Error updating book status',
//             error: error.message
//         });
//     }
// });

// myBookRoutes.patch('/:bookId/rating', authMiddleware, async (req, res) => {
//     const { bookId } = req.params;

//     try {
//         const updated = await MyBookModel.findOneAndUpdate(
//             { userId: req.userId, bookId },
//             { rating: req.body.rating },
//             { new: true }
//         );

//         if (!updated) {
//             return res.status(404).json({ msg: "Book not found in user's list" });
//         }

//         res.json({ msg: "Rating has been updated", data: updated });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             msg: 'Error updating book status',
//             error: error.message
//         });
//     }
// });


module.exports = { myBookRoutes };