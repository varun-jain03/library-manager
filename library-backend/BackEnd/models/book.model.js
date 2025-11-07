const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    coverImage: { type: String, required: true },
    availability: { type: Boolean, default: true }
},{versionKey: false, toJSON: {virtuals: true}})

bookSchema.virtual("MyBooks",{
    ref: "MyBooks",
    localField: "_id",
    foreignField: "bookId"
})

const BookModel = mongoose.model("books", bookSchema);

module.exports = { BookModel };