import joi from "joi";

export const rentalsSchema = joi.object({
  customerId: joi.number().positive(),
  gameId: joi.number().positive(),
  daysRented: joi.number().positive()

});