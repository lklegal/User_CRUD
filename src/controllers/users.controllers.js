const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const model = require("../model/users.model");
const utils = require("../utils");

const listAllUsernames = (req, res) => {
    const dbQuery = async () => {
        try{
            const data = await utils.dbQueryCallback(model.listAllUsernames);
            res.status(200).json(data);
        }catch(err){
            res.status(500).json({error: "Database error"})
        }
    }

    dbQuery();
};

const login = (req, res) => {
    const {username, password} = req.body;

    const mainLogin = async () => {
        try {
            const allUsers = await utils.dbQueryCallback(model.listAllUsers);
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

            /*changing the user's isActive database attribute to 1 (true), so that their authentication
            can be successfully checked when needed*/
            const changeUserStatus = async () => {
                try{
                    const newStatus = 1;
                    await utils.dbQueryCallback(model.changeUserStatus, newStatus, user.userID);
                }catch(err){
                    res.status(500).json({error: "Database error"});
                }
            }

            changeUserStatus();

            const expiresIn = "2h";
            const token = jwt.sign({id: user.userID, username: user.username}, process.env.JWT_SECRETKEY,
                {expiresIn});
            res.status(200).json({type: "Bearer", token: token, expiresIn: expiresIn});
        } catch(err){
            res.status(500).json({error: "Database error"});
        }
    };

    mainLogin();
};

const showUserById = (req, res) => {
    if(req.body.userID !== parseInt(req.params.id)){
        res.status(403).json({error: "User not authorized to access this information."});
        return;
    }

    const dbQuery = async () => {
        try{
            const userData = await utils.dbQueryCallback(model.showUserById, parseInt(req.params.id));
            res.status(200).json(userData);
        }catch(err){
            res.status(500).json({error: "Database error."});
        }
    }

    dbQuery();
};

const createUser = (req, res) => {
    const {username, email, password} = req.body;
    
    const createUserMain = async () => {
        try {
            const allUsers = await utils.dbQueryCallback(model.listAllUsers);

            const alreadyUsed = allUsers.find((value) => {
                return username === value.username || email === value.userEmail;
            });

            if(alreadyUsed){
                res.status(400).send({error: "Username or email already used."});
                return;
            }

            const salt = bcrypt.genSaltSync();
            const hashedPassword = bcrypt.hashSync(password, salt);

            const dbQuery = async () => {
                try{
                    await utils.dbQueryCallback(model.createUser, {
                        'username': username,
                        'email': email,
                        'password': hashedPassword,
                        'salt': salt
                    });
                    res.status(201).json();
                } catch(err){
                    res.status(500).json({error: "Database error"});
                }
            }
            dbQuery();
        } catch(err) {
            res.status(500).json({error: "Database error"});
        }
    };

    createUserMain();
};

const alterPassword = (req, res) => {
    if(req.body.userID !== parseInt(req.params.id)){
        res.status(403).json({error: "User not authorized to access this information."});
        return;
    }

    const password = req.body.password;
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    const dbQuery = async () => {
        try{
            await utils.dbQueryCallback(model.alterPassword, hashedPassword, salt, parseInt(req.params.id));
            res.status(200).json();
        }catch(err){
            res.status(500).json({error: "Database error"});
        }
    }

    dbQuery();
};

const deleteUser = (req, res) => {
    if(req.body.userID !== parseInt(req.params.id)){
        res.status(403).json({error: "User not authorized to perform this action."});
        return;
    }

    const dbQuery = async () => {
        try{
            await utils.dbQueryCallback(model.deleteUser, parseInt(req.params.id));
            res.status(200).json();
        }catch(err){
            res.status(500).json({error: "Database error"});
        }
    }

    dbQuery();

};

module.exports = {
    listAllUsernames,
    login,
    showUserById,
    createUser,
    alterPassword,
    deleteUser
};