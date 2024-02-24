const jwt = require("jsonwebtoken");
const model = require("../model/users.model");
const utils = require("../utils");

const checkIfUserIsActive = async (userID) => {
    let queryResult;
    try{
        queryResult = await utils.dbQueryCallback(model.checkIfUserIsActive, userID);
        if(queryResult.length > 0){
            //The query result array should have length of 1, actually, since every userID should be unique 
            queryResult = queryResult[0].isActive;
        }else{
            //if the query returns nothing, the user doesn't exist, so it can be considered inactive
            queryResult = 0;
        }
    }catch(err){
        console.log(err);
        queryResult = "Database error";
    }
    return queryResult;
}

const checkAuthentication = (req, res, next) => {
    if(!req.headers.authorization){
        res.status(400).json({error: "Request must have a JWT token in the authorization header"});
        return;
    }
    const fullToken = req.headers.authorization;

    const tokenSplit = fullToken.split(" ");

    if(tokenSplit.length == 1){
        res.status(400).json({error: "The JWT token must have a type."});
        return;
    }

    const token = tokenSplit[1];
    
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, payload) => {
        if(err){
            res.status(401).json({err});
        }else{
            const checkUserStatus = async () => {
                const userStatus = await checkIfUserIsActive(payload.id);
                if(userStatus === "Database error"){
                    res.status(500).json({error: userStatus});
                }else if(userStatus === 0){
                    //the user either doesn't exist, or logged out at some point (logout not implemented in this project)
                    res.status(401).json({error: "Session expired"});
                }else{
                    //so the controller knows who logged in
                    req.body.userID = payload.id;
                    next();
                }
            }
            checkUserStatus();
        }
    })
}

module.exports = checkAuthentication;