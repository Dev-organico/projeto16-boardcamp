import joi from "joi";

export const customersSchema = joi.object({
  
    name: joi.string().required().min(1) ,
    phone: joi.string().required().min(11).max(12).regex(/^\d+$/),
    cpf: joi.string().length(11).regex(/^\d+$/),
    birthday: joi.date().required(),
});