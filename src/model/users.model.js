const dbConnection = require("../config/dbconfig");

const listAllUsersnames = async (callback) => {
    const sql = "SELECT username FROM Users;";
    dbConnection.query(sql, callback);
};

const listAllUsers = async (callback) => {
    const sql = "SELECT * FROM Users;";
    dbConnection.query(sql, callback);
};

const showUserById = (id, callback) => {
    /*Removing id from the array to put it again right after. Is this more or less confusing than just
    passing the id in dbConnection.query without the "[]", since it's already an array?*/
    id = id[0];
    const sql = "SELECT * FROM Users WHERE userID = ?";
    dbConnection.query(sql, [id], callback);
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