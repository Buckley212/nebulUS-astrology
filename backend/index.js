const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')


mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost/HackerBlog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(x => console.log(`Connected to ${x.connections[0].name}`))
    .catch(() => console.error("Error connecting to Mongo"))


app.use(express.json())

app.use(cors())


app.use('/api', require('./routes/routes.js'))


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening to port ${PORT}`))