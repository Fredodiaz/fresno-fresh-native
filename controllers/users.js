const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const MessageGroup = require('../models/MessageGroup');

const { secretOrKey } = require('../config/keys');
let refreshTokens = [];
const tokenExp = '1h'

// @desc Creates New User => Required: Email, Username, Password
// @route POST api/users/register
// @access PUBLIC
createUser = (req, res) => {
    const { body } = req
    
    // Validation
    if (!body.email || !body.password || !body.username) {
      return res.status(400).json({ msg: 'Please enter all fields: Email, Username, Password' });
    }

    // Returns Error if User Email or Username Already Exists
    User.findOne({ email: body.email, username: body.username }).then( user => {
        if(user) {
            return res.status(400).json({msg: 'Email or Username already exists!'});
        }

        const newUser = new User(body)
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash( newUser.password, salt, (err, hash) => {
                newUser.password = hash;

                newUser.save()
                .then( () => {
                    return res.status(201).json({
                        success: true,
                        msg: 'User Created!'
                    })
                })
                .catch( error => {
                    return res.status(400).json({
                        msg: 'User not created!',
                        error: error.message
                    })
                })
            })
        })
    })
}

// @desc Logs User => Returns: Refresh & Access Token
//       * Access token is able to access endpoints
//       * Refresh token generates new Acess token 
// @route POST api/users/login
// @access PUBLIC
login = (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username }).then(user => {
        if(!user) {
            return res.status(404).json({ success: false, emailNotFound: "Username not found!"})
        }

        // Returns Tokens if Password is Valid
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
                const payload = {
                    id: user._id,
                    username
                };

                const accessToken = jwt.sign( payload, secretOrKey, { expiresIn: tokenExp });
                const refreshToken = jwt.sign( payload, secretOrKey);

                refreshTokens.push(refreshToken);

                res.json({
                    user: user.username,
                    accessToken,
                    refreshToken,
                    success: true,
                });

            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect"});
            }
        });
    });
};

// @desc Deletes Refresh Token to Prevent Further Access Token Generating
//      * Required: Refresh Token
// @route GET api/users/logout
// @access PRIVATE
logout = (req, res) => {
    const { authorization } = req.headers;
    const refToken = authorization.split(' ')[1];

    if (!refreshTokens.includes(refToken)) {
        return res.sendStatus(403);
    }
    refreshTokens = refreshTokens.filter(token => refToken !== token);
    // refreshTokens = [],

    res.send(`Logout successful ${refreshTokens}`);
}

// @desc Generates New Access Token => Required: Refresh Token
// @route GET api/users/token
// @access PRIVATE
token = (req, res) => {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, secretOrKey, (err, user) => {
        const payload = {
            id: user.id,
            username: user.username
        }

        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign(payload, secretOrKey, { expiresIn: tokenExp });

        res.json({
            accessToken
        });
    });
};

// @desc Gets user
// @route GET api/users/load
// @access PRIVATE
loadUser = (req, res) => {
    const { username } = req.user // Data from token

    User.findOne({username})
    .then(user => {
        if(!user){
            return res.status(404).json({msg: 'User not found!'})
        }
        const userData = {
            username: user.username,
            email: user.email,
            conversations: user.conversations
        }

        return res.status(201).json(userData)
    })

}

module.exports = {
    createUser,
    login,
    logout,
    token,
    loadUser,
}