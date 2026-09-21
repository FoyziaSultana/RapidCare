const Joi = require('joi');
const signUpValidation = (req,res,next)=>{
    const schema = Joi.object({
        UserName: Joi.string().min(3).max(100).required(),
        UserEmail: Joi.string().email().required(),
        UserPhone: Joi.string()
        .pattern(/^01[3-9]\d{8}$/)
        .required(),

        UserPassword: Joi.string().min(8).max(15).required(),
    });
    const {error} = schema.validate(req.body);
    if(error)
    {
        return res.status(400).json({message:"Bad request",error})
    }
    next();
}

const loginValidation = (req,res,next)=>{
    const schema = Joi.object({
        UserEmail: Joi.string().email().required(),
        UserPassword: Joi.string().min(8).max(15).required(),
    });
    const {error} = schema.validate(req.body);
    if(error)
    {
        return res.status(400).json({message:"Bad request",error})
    }
    next();
}

module.exports = {signUpValidation, loginValidation}