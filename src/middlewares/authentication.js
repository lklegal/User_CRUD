const jwt = require("jsonwebtoken");

const checkAuthentication = (req, res, next) => {
    let fullToken = req.headers.authorization;

    tokenSplit = fullToken.split(" ");

    if(tokenSplit.length == 1){
        res.status(400).json({error: "The JWT token must have a type."});
        return;
    }

    token = tokenSplit[1];
    
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, payload) => {
        if(err){
            res.status(401).json({err});
        }else{
            req.body.userID = payload.id;
            next();
        }
    })
}

module.exports = checkAuthentication;