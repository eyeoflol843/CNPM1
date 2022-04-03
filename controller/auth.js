const mongoose = require("mongoose");

const jwt = require('jsonwebtoken')

const jwtController = require('../controller/jwt');

const userModel = require('../schemas/user');


const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username: username, password: password });
        if (password !== user.password) {
            res.status(404).json('Authentication Fail !!');
        }

        if (user === null) {
            res.status(404).json('Authentication Fail !!');
        }

        const accessToken = jwt.sign({ username: username }, 'secret', { expiresIn: '24h' });
        res.status(200).json({ user_id: user._id, message: 'Login success', accessToken: accessToken, tokenType: 'Bearer' });
    } catch (error) {
        console.log(error);
        res.status(404).json('Authentication Fail !!');
    }
}



module.exports = {
    login,
}