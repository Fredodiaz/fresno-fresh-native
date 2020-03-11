const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
let { secretOrKey, refreshTokens } = require('../config/keys');

// @desc Creates New Sser => Required: Email and Password
// @route POST api/user/register
// @access PUBLIC
createUser = (req, res) => {
    const { body } = req

    // Validation
    if (!body.email || !body.password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Returns Rrror if User Email Already Exists
    User.findOne({ email: body.email }).then( user => {
        if(user) {
            return res.status(400).json({msg: 'email already exists'});
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
                        error: error.message,
                        msg: 'User not created!'
                    })
                })
            })
        })
    })
}

// @desc Logs User => Returns: Refresh & Access Token
//       * Access token is able to access endpoints
//       * Refresh token generates new Acess token 
// @route POST api/user/login
// @access PUBLIC
login = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }).then(user => {
        if(!user) {
            return res.status(404).json({ success: false, emailNotFound: "email not found"})
        }

        // Returns Tokens if Password is Valid
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
                const payload = {
                    // id: user.id,
                    name: user.name
                };

                const accessToken = jwt.sign( payload, secretOrKey, { expiresIn: '1m' });
                const refreshToken = jwt.sign( payload, secretOrKey);

                refreshTokens.push(refreshToken);

                res.json({
                    success: true,
                    accessToken,
                    refreshToken,
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
// @route GET api/user/logout
// @access PRIVATE
logout = (req, res) => {
    const { authorization } = req.headers;
    const refToken = authorization.split(' ')[1];
    refreshTokens = refreshTokens.filter(token => refToken !== token);

    res.send(`Logout successful ${refreshTokens}`);
}

// @desc Generates New Access Token => Required: Refresh Token
// @route GET api/user/token
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
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ name: user.name }, secretOrKey, { expiresIn: '1m' });

        res.json({
            accessToken
        });
    });
};

// @desc Sends back dummy data based of token
// @route GET api/user/data
// @access PRIVATE
getData = (req, res) => {
    res.json({data: '123'})
}

module.exports = {
    createUser,
    login,
    getData,
    logout,
    token,
}