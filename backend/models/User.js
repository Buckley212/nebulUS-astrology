const { Schema, model } = require('mongoose')

const userSchema = new Schema({

    imageUrl: String,
    email: { type: String, unique: true },
    name: String,
    googleId: String,
    DOB: Date,
    username: String
})

const User = model('User', userSchema)

module.exports = User