import Joi from "joi";

export const createSchema = Joi.object({
  username: Joi.string().trim().min(2).max(15).required(),
  password: Joi.string().trim().min(4).required(),
  confirm_password: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "any.only": '"confirm_password" did not match',
    }),
});

export const userLoginSchema = Joi.object({
  username: Joi.string().trim().min(2).max(15).required(),
  password: Joi.string().trim().min(4).required(),
});
