const model = require("../model/users.model");
const bcrypt = require("bcrypt");

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

};

const showUserById = (req, res) => {

};

const createUser = (req, res) => {
    const {username, email, password} = req.body;

    const fetchUsernames = () => {
        return new Promise((resolve, reject) => {
            model.listAllUsers((err, data) => {
                if (err) {
                    reject();
                } else {
                    resolve(data);
                }
            });
        });
    };

    const createUserCallback = (err, data) => {
        if(err) {
            res.status(500).json({ message: "Database error"});
        } else {
            res.status(200).json();
        }
    };
    
    const createUserMain = async () => {
        try {
            const allUsers = await fetchUsernames();

            alreadyUsed = allUsers.find((value) => {
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
            res.status(500).send({error: "Database error.", err});
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