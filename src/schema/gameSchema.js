import joi from "joi";

export const gameSchema = joi.object({
  name: joi.string().required().min(1),
  image: joi.string().required(),
  stockTotal: joi.number().positive(),
  pricePerDay: joi.number().positive()

});

 /*  name: joi.string().required().min(1),
  description: joi.string().required(),
  type: joi.string().valid("positive", "negative").required() */