const dbConnection = require("../config/dbconfig");

const listAllUsersnames = async (callback) => {
    const sql = "SELECT username FROM Users;";
    dbConnection.query(sql, callback);
};

const listAllUsers = async (callback) => {
    const sql = "SELECT * FROM Users;";
    dbConnection.query(sql, callback);
};

const showUserById = () => {

};

const createUser = (userInfo, callback) => {
    //because userInfo is passed as the ...args of the dbQueryCallback function, it comes within an array
    userInfo = userInfo[0];
    const sql = "INSERT INTO Users (userName, userEmail, userPassword, userSalt) values (?, ?, ?, ?);";
    dbConnection.query(sql, [userInfo.username, userInfo.email, userInfo.password, userInfo.salt],
        callback);
};

const alterUser = () => {

};

const deleteUser = () => {

};

module.exports = {
    listAllUsersnames,
    listAllUsers,
    showUserById,
    createUser,
    alterUser,
    deleteUser
};