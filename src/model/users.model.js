const dbConnection = require("../config/dbconfig");

const listAllUsernames = async (callback) => {
    const sql = "SELECT username FROM Users;";
    dbConnection.query(sql, callback);
};

const showUserById = (id, callback) => {
    /*Removing id from the array to put it again right after. Is this more or less confusing than just
    passing the id in dbConnection.query without the "[]", since it's already an array? Same for
    the other queries where this happens, by the way.*/
    id = id[0];
    const sql = "SELECT * FROM Users WHERE userID = ?;";
    dbConnection.query(sql, [id], callback);
};

const createUser = (userInfo, callback) => {
    //because userInfo is passed as the ...args of the dbQueryCallback function, it comes within an array
    userInfo = userInfo[0];
    const sql = "INSERT INTO Users (userName, userEmail, userPassword, userSalt) values (?, ?, ?, ?);";
    dbConnection.query(sql, [userInfo.username, userInfo.email, userInfo.password, userInfo.salt],
        callback);
};

const alterPassword = (params, callback) => {
    const newPassword = params[0];
    const newSalt = params[1]
    const id = params[2];
    const sql = "UPDATE Users SET userPassword = ?, userSalt = ? WHERE userID = ?;";
    dbConnection.query(sql, [newPassword, newSalt, id], callback);
};

const deleteUser = (id, callback) => {
    id = id[0];
    const sql = "DELETE FROM Users WHERE userID = ?;";
    dbConnection.query(sql, [id], callback);
};

const checkIfUserIsActive = async (id, callback) => {
    id = id[0];
    const sql = "SELECT isActive FROM Users WHERE userID = ?;";
    dbConnection.query(sql, [id], callback);
};

const changeUserStatus = async (params, callback) => {
    newStatus = params[0];
    id = params[1];
    const sql = "UPDATE Users SET isActive = ? WHERE userID = ?;";
    dbConnection.query(sql, [newStatus, id], callback);
}

const showUserByUsername = async (username, callback) => {
    username = username[0];
    const sql = "SELECT * FROM Users WHERE username = ?;";
    dbConnection.query(sql, [username], callback);
};

const findUserWithUsernameAndEmail = async (params, callback) => {
    username = params[0];
    userEmail = params[1];
    const sql = "SELECT EXISTS (SELECT 1 FROM Users WHERE username = ? OR userEmail = ?) AS usernameOrEmailAlreadyExist;"
    dbConnection.query(sql, [username, userEmail], callback);
};

module.exports = {
    listAllUsernames,
    showUserById,
    createUser,
    alterPassword,
    deleteUser,
    checkIfUserIsActive,
    changeUserStatus,
    showUserByUsername,
    findUserWithUsernameAndEmail
};