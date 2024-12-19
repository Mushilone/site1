const ApiError = require("../error/apiError");
const User = require("../models/user");

class UserController {
    async register(req, res) {

    }
    async login(req, res) {

    }
    async check(req, res, next) {
        const idQuery = req.query.id;
        if(idQuery == null)
            return next(ApiError.badRequest("Auth: Id is null!"));
        res.json("true");
    }

    async get(req, res) {
        res.json(await User.findAll());
    }
    async getId(req, res) {
        const idParam = req.params.id;
        if (idParam == null) {
            res.status(400).send("Invalid id request parameter.");
            return;
        }
        if (isNaN(idParam)) {
            res.status(400).send("Id param is NaN!");
            return;
        }
        res.json(await User.findAll({ where: { id: idParam } }));
    }
    async post(req, res) {

    }
    async put(req, res) {

    }
    async delete(req, res) {

    }

}

module.exports = new UserController();