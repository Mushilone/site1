const User = require("../models/user");

class UserController{
    async register(req, res){

    }
    async login(req, res){

    }
    async check(req,res){

    }

    async get(req,res){
        res.json(await User.findAll());
    }
    async getId(req,res){
        const idParam = req.params[id];
        if(idParam == null)
        {
            res.status(400).send("Invalid id request parameter.");
            return;
        }
        res.json(await User.findAll({where:{id: idParam}}));
    }
    async post(req, res){

    }

}

module.exports = new UserController();