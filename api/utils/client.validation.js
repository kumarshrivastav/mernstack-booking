// const joi=require('joi')
import Joi from "joi";
export const verifyRegistration=(body)=>{
    const joiSchema=Joi.object({
        firstName:Joi.string().min(5).max(20).required(),
        lastName:Joi.string().min(5).max(20).required(),
        email:Joi.string().min(5).max(50).email().required(),
        password:Joi.string().min(5).max(1024).required()
    })
    const {error}=joiSchema.validate(body)
    return error;
}

export const verifyLogin=(body)=>{
    const joiSchema=Joi.object({
        email:Joi.string().min(5).max(50).email().required(),
        password:Joi.string().min(5).max(1024).required()
    })
    const {error}=joiSchema.validate(body)
    return error
}
