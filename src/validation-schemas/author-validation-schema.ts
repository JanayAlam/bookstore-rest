import Joi from "joi";

export const createSchema = Joi.object({
  name: Joi.string().trim().min(2).max(30).required(),
  bio: Joi.string().trim(),
  birthdate: Joi.date().required(),
});

export const updateSchema = Joi.object({
  name: Joi.string().trim().min(2).max(30),
  bio: Joi.string().trim(),
  birthdate: Joi.date(),
});
