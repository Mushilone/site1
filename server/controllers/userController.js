require("dotenv").config({path: __dirname+"/.env"});
const ApiError = require("../error/apiError");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id, username) =>{
    return jwt.sign({id: id, username: username}, process.env.JWT_KEY, {expiresIn:"24h"}); 
};

///TODO: вернуться с auth.
class UserController {
    async register(req, res, next) {
        const {username, password} = req.body;
        if(!username || !password)
            return next(ApiError.badRequest("User Register: empty username or password!"));
        const us = await User.findOne({where:{username: username}});
        if(us != null)
            return next(ApiError.badRequest("User Register: user with that username already exists!"));
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({username: username, password: hashPassword});
        const token = generateJwt(user.id, user.username);
        return res.json({token}); 
    } 
    async login(req, res, next) {
        const {username, password} = req.body;
        if(!username || !password)
            return next(ApiError.badRequest("User Login: empty username or password!"));
        const user = await User.findOne({where:{username: username}});
        if(user == null)
            return next(ApiError.internal("User Login: user with that username not exists!"));
        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword)
            return next(ApiError.internal("User Login: invalid password data!"));
        const token = generateJwt(user.id, user.username);
        return res.json({token});
    }
    async check(req, res, next) {
        
    }

    async get(req, res) {
        res.json(await User.findAll());
    }
    async getId(req, res, next) {
        const idParam = req.params.id;
        if (idParam == null)
            return next(ApiError.badRequest("User GET: id parameter is null!"));
        if (isNaN(idParam)) 
            return next(ApiError.badRequest("User GET: invalid id param!"));
        res.json(await User.findAll({ where: { id: idParam } }));
    }
    async put(req, res) {
        
    }

}

module.exports = new UserController();