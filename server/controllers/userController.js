require("dotenv").config({ path: __dirname + "/.env" });
const ApiError = require("../error/apiError");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id, username) => {
    return jwt.sign({ id: id, username: username }, process.env.JWT_KEY, { expiresIn: "24h" });
};

class UserController {
    async register(req, res, next) {
        const { username, password } = req.body;
        if (!username || !password)
            return next(ApiError.badRequest("User Register: empty username or password!"));
        const us = await User.findOne({ where: { username: username } });
        if (us != null)
            return next(ApiError.badRequest("User Register: user with that username already exists!"));
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ username: username, password: hashPassword });
        const token = generateJwt(user.id, user.username);
        res.json({ token });
    }
    async login(req, res, next) {
        const { username, password } = req.body;
        if (!username || !password)
            return next(ApiError.badRequest("User Login: empty username or password!"));
        const user = await User.findOne({ where: { username: username } });
        if (user == null)
            return next(ApiError.internal("User Login: user with that username not exists!"));
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword)
            return next(ApiError.internal("User Login: invalid password data!"));
        const token = generateJwt(user.id, user.username);
        res.json({ token });
    }
    async check(req, res) {
        res.json({ id: req.user.id });
    }
    async checkPassword(req, res, next){
        const {oldPassword} = req.body;
        if(!oldPassword)
            return next(ApiError.badRequest("Check password: old password is null!"));
        const user = await User.findByPk(req.user.id);
        if (user == null)
            return next(ApiError.internal("User Login: user with that username not exists!"));
        console.log("USERS PASSWORD: " + user.password);
        console.log("OLD USERS PASSWORD: " + user.password);
        if(!bcrypt.compareSync(oldPassword, user.password))
            return next(ApiError.badRequest("Check password: invalid password!"));
        res.json(true);
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
    async put(req, res, next) {
        try {
            const { id, name, surname, username, password } = req.body;
            if (!id || !username || !password) {
                return next(ApiError.badRequest("User PUT: body data is null!"));
            }
            if (isNaN(id)) {
                return next(ApiError.badRequest("User PUT: invalid id value!"));
            }
            if (!(await User.findByPk(id))) {
                return next(ApiError.badRequest("User PUT: user with that id not exists!"));
            }
            if (!name && !surname)
                return res.json(await User.update({ username: username, password: await bcrypt.hash(password, 5) }, { where: { id: id } }));
            return res.json(await User.update({ name: name, surname: surname, username: username, password: await bcrypt.hash(password, 5) }, { where: { id: id } }));
        }
        catch (err) {
            return next(ApiError.badRequest(err.message));
        }
    }
}

module.exports = new UserController();