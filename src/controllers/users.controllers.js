const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const model = require("../model/users.model");
const utils = require("../utils");

const listAllUsersnames = (req, res) => {
    const callback = (err, data) => {
        if(err) {
            res.status(500).json({ message: "Database error"});
        } else {
            res.status(200).json(data);
        }
    };    

    model.listAllUsersnames(callback);
};

const login = (req, res) => {
    const {username, password} = req.body;

    const mainLogin = async () => {
        try {
            const allUsers = await utils.fetchUsers(model);
            const user = allUsers.find((value) => {
                return username === value.username;
            });

            if(!user){
                res.status(401).json({error: "Invalid username or password."});
                return;
            }

            const hashedPassword = bcrypt.hashSync(password, user.userSalt);

            if(hashedPassword != user.userPassword){
                res.status(401).json({error: "Invalid username or password."});
                return;
            }

            const expiresIn = "100s";
            const token = jwt.sign({id: user.userID, username: user.username}, process.env.JWT_SECRETKEY,
                {expiresIn});
            res.status(200).json({type: "Bearer", token: token, expiresIn: expiresIn});
        } catch(err){
            res.status(500).send({error: "Database error.", err});
        }
    };

    mainLogin();
};

const showUserById = (req, res) => {

};

const createUser = (req, res) => {
    const {username, email, password} = req.body;

    const createUserCallback = (err, data) => {
        if(err) {
            res.status(500).json({ message: "Database error"});
        } else {
            res.status(201).json();
        }
    };
    
    const createUserMain = async () => {
        try {
            const allUsers = await utils.fetchUsers(model);

            const alreadyUsed = allUsers.find((value) => {
                return username === value.username || email === value.userEmail;
            });

            if(alreadyUsed){
                res.status(400).send({error: "Username or email already used."});
                return;
            }

            const salt = bcrypt.genSaltSync();
            const hashedPassword = bcrypt.hashSync(password, salt);
            model.createUser(username, email, hashedPassword, salt, createUserCallback);
        } catch(err) {
            res.status(500).json({error: "Database error."});
        }
    };

    createUserMain();
};

const alterUser = (req, res) => {

};

const deleteUser = (req, res) => {

};

module.exports = {
    listAllUsersnames,
    login,
    showUserById,
    createUser,
    alterUser,
    deleteUser
};