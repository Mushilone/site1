const ApiError = require("../error/apiError");
const Enrollment = require("../models/enrollment");
const User = require("../models/user");



class EnrollmentController{
    async get(req, res){
        res.json(await Enrollment.findAll());
    }
    async getId(req, res, next){
        const idParam = req.params.id;
        if(idParam == null)
            return next(ApiError.badRequest("Enrollment GET: id param is null!"));
        if (isNaN(idParam)) 
            return next(ApiError.badRequest("Enrollment GET: invalid id param!"));
        res.json(await Enrollment.findByPk({idParam}));
    }
    async post(req, res, next){
        try{
            const {date, UserId} = req.body;
            if(date == null || UserId == null)
                return next(ApiError.badRequest("Enrollment POST: invalid body data!"));
            const d = new Date(date);
            if(isNaN(d) || isNaN(UserId))
                return next(ApiError.badRequest("Enrollment POST: invalid date or id value!"));
            if((await User.findAll({where:{id: UserId}})).length == 0)
                return next(ApiError.badRequest("Enrollment POST: user with that id not exists!"));
            const enr = await Enrollment.create({date, UserId});
            return res.json(enr);
        }
        catch(err){
            return next(ApiError.badRequest(err.message));
        }
    }
    async put(req, res, next){
        try{
            const {id, date} = req.body;
            if(id == null || date == null)
                return next(ApiError.badRequest("Enrollment PUT: id or date is null!"));
            const d = new Date(date);
            if(isNaN(id) || isNaN(d))
                return next(ApiError.badRequest("Enrollment PUT: invalid id or date values!"));
            if(await Enrollment.findByPk(id) == null)
                return next(ApiError.badRequest("Enrollment PUT: enrollment with that id not exists!"));
            return res.json(await Enrollment.update({date: d}, {where:{id:id}}));
        }
        catch(err){
            return next(ApiError.badRequest(err.message));
        }
    }
    async delete(req, res, next){
        const id = req.params.id;
        if(id == null)
            return next(ApiError.badRequest("Enrollment DELETE: id param is null!"));
        if(isNaN(id))
            return next(ApiError.badRequest("Enrollment DELETE: invalid id param data!"));
        return res.json(await Enrollment.destroy({where: {id: id}}));
    }
}

module.exports = new EnrollmentController();