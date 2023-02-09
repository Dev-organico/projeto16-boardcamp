import joi from "joi";

export const customersSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required(),
  type: joi.string().valid("positive", "negative").required()
});