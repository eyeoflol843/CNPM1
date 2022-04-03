const mongoose = require("mongoose");

const userModel = require('../schemas/user');


const createUser = (req, res, next) => {
    const { username, password, age }  = req.body;
    // Create new user
    const user = new userModel({ username: username, password: password, age: age, isActive: true});
    
    user.save((err) => {
        if (!err) {
            res.status(201).json(user);
        } else {
            res.status(200).json('Create user fail !!')
        } 
    });
};


const getUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await userModel.findOne({ _id: userId });
        if (user === null) {
            res.status(404).json('User not found !!');
        }
    
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(404).json('User not found !!');
    }
    
}

module.exports = {
    createUser,
    getUser,
}