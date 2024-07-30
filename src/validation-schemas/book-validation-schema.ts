import Joi from "joi";

export const createSchema = Joi.object({
  title: Joi.string().trim().min(2).required(),
  description: Joi.string().trim(),
  published_date: Joi.date().less("now").required(),
  author_id: Joi.number().required(),
});

export const updateSchema = Joi.object({
  title: Joi.string().trim().min(2),
  description: Joi.string().trim(),
  published_date: Joi.date().less("now"),
  author_id: Joi.number(),
});
