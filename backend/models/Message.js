const { Schema, model } = require('mongoose')

const messageSchema = new Schema({

    message: String,
    ownerId: { type: Schema.Types.ObjectId }

})

const Message = model('Message', messageSchema)

module.exports = Message