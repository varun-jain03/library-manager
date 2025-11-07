const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true }
},{ versionKey: false, toJSON: { virtuals: true } })

userSchema.virtual("MyBooks",{
    ref: "MyBooks",
    localField: "_id",
    foreignField: "userId"
})

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };