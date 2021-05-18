require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('./config/passport');

mongoose
    .connect('mongodb+srv://team:chat2021@cluster0.2mhfj.mongodb.net/final', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(x => console.log(`Connected to ${x.connections[0].name}`))
    .catch(() => console.error("Error connecting to Mongo"))

const app_name = require('./package.json').name;
const debug = require('debug')(
    `${app_name}:${path.basename(__filename).split('.')[0]}`
);
app.use(express.json())

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://nebulus-astrology.netlify.com'], //Swap this with the client url
    })
)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use('/api', require('./routes/routes.js'))

app.get('*', (req, res, next) => {
    console.log('weird', req.headers.host, 'peach', req.url);
  
    if (req.headers.host.includes('heroku')) {
      res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    } else {
      next();
    }
  });  


module.exports = app;