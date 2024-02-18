const dbConnection = require("../config/dbconfig");

const listAllUsersnames = async (callback) => {
    const sql = "SELECT username FROM Users;";
    dbConnection.query(sql, callback);
};

const listAllUsers = async (callback) => {
    const sql = "SELECT * FROM Users;";
    dbConnection.query(sql, callback);
};

const login = () => {

};

const showUserById = () => {

};

const createUser = (username, email, password, salt, callback) => {
    const sql = "INSERT INTO Users (userName, userEmail, userPassword, userSalt) values (?, ?, ?, ?);";
    dbConnection.query(sql, [username, email, password, salt], callback);
};

const alterUser = () => {

};

const deleteUser = () => {

};

module.exports = {
    listAllUsersnames,
    listAllUsers,
    login,
    showUserById,
    createUser,
    alterUser,
    deleteUser
};