const ApiError = require("../error/apiError");
const jwt = require("jsonwebtoken");
require("dotenv").config({path: __dirname + "/.env"});

module.exports = async function(req, res, next){
    if(req.method == "OPTIONS"){
       next();
    }
    try{
        // const token = req.headers.authorization.split(' ')[1];
        const token = req.cookies.jwt;
        if(!token)
            return next(await ApiError.forbidden("Not authorized."));
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    }
    catch(e){
        return next(await ApiError.forbidden("Not authorized."));
    }

};