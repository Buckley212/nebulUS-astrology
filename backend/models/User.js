const { Schema, model } = require('mongoose')

const userSchema = new Schema({

    imageUrl: String,
    email: { type: String, unique: true },
    name: String,
    googleId: String,
    chart: Object,
    rising: Object
})

const User = model('User', userSchema)

module.exports = User;