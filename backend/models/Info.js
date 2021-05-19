const { Schema, model } = require('mongoose')
const infoSchema = new Schema({ 
DOB: Date,
FirstName: String,
LastName: String,
}
userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  })