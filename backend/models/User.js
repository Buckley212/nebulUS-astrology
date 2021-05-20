const { Schema, model } = require('mongoose')

const userSchema = new Schema({

    imageUrl: String,
    email: { type: String, unique: true },
    name: String,
    googleId: String,
    sun: String,
    moon: String,
    rising: String,
    friends: Array
    
})

const User = model('User', userSchema)

module.exports = User;