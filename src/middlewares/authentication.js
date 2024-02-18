const jwt = require("jsonwebtoken");

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
            req.body.userID = payload.id;
            next();
        }
    })
}

module.exports = checkAuthentication;