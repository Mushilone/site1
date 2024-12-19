const ApiError = require("../error/apiError");
const User = require("../models/user");

class UserController {
    async register(req, res) {
        
    }
    async login(req, res) {

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