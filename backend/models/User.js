const { Schema, model } = require('mongoose')

const userSchema = new Schema({

    imageUrl: String,
    email: { type: String, unique: true },
    name: String,
    googleId: String,
<<<<<<< HEAD
    DOB: Date,
    username: String
=======
    chart: Array
>>>>>>> 610f5a26aff9498e6ee4c3788012bf85abebad86
})

const User = model('User', userSchema)

module.exports = User