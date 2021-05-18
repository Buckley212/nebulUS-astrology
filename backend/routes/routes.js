const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const Message = require('../models/Message')
const User = require('../models/User')

router.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
  
router.post(`/add-message`, authorize, (req, res) => {
    let msg = req.body
    msg.ownerId = res.locals.user._id
    Message.create(msg).then(message => res.json(message))
})

router.get(`/getUser`, authorize, async (req, res) => {
    //console.log("in get user after next", res.locals.user._id)
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
          res.status(403).json(err);
        } else {
          User.findById(authData.user._id)
            .then((user) => {
              res.status(200).json(user);
            })
            .catch((err) => res.status(500).json(err));
        }
    });
})







router.get(`/get-messages`, (req, res) => {
    Message.find().then(messages => res.json(messages))
})

router.get(`/get-my-messages`, authorize, (req, res) => {
    Message.find({ ownerId: res.locals.user._id }).then(messages => res.json(messages))
})


router.get(`/`, (req, res) => {
    res.json({ serverWorks: true })
})

router.post(`/logMeIn`, async (req, res) => {

    //Find user
    let user = await User.findOne({ email: req.body.email })

    //If no user >> Create User
    if (!user) {
        user = await User.create(req.body)
    }

    //No matter what i have a user and now I can create the jwt token 
    jwt.sign({ user }, 'secret key', { expiresIn: '30min' }, (err, token) => {
        res.json({ user, token })
    })

})

router.post('/submitDate', async (req, res) => {
    await User.findOneAndUpdate({ googleId: req.body.userId }, { chart: req.body.chart, rising: req.body.rising }, { new: true })
    console.log(req.body.chart);
})

router.post('/addFriend', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    const added = await User.findOne({ email: req.body.friend }, { googleId: 1 });
    if (added) {
        await User.findOneAndUpdate({ googleId: req.body.userId }, { $push: { friends: added.googleId } }, { new: true })
        console.log(req)
    }
})

router.get('/getFriends', authorize, async (req, res) => {
    const me = await User.findById(res.locals.user._id)
    const friends = await User.find({ "googleId": { "$in": me.friends } });

    res.json(friends);
})

function authorize(req, res, next) {
    console.log('monkey in the mittle', req.headers)
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
    // Split at the space
        const bearer = bearerHeader.split(' ');
    // Get token from array
        const bearerToken = bearer[1];
    // Set the token
        req.token = bearerToken;
    // Next middleware
        next();
    } else {
    // Forbidden
        res.status(403); //.json({err:'not logged in'});
  }
}
module.exports = router