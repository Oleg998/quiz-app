import Joi from "joi";

export const createQuizSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  questions: Joi.string().required(),

});

export const updateQuizSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  questions: Joi.string(),
});

