const mongoose = require('mongoose');

const myBookSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books",
        required: true
    },
    status: { type: String, enum: ['Want to Read', 'Currently Reading', 'Read'], default: 'Want to Read' },
    rating: { type: Number, required: true, min: 1, max: 5}
})

const MyBookModel = mongoose.model("MyBooks", myBookSchema);

module.exports = { MyBookModel };