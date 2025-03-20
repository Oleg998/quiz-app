import Joi from "joi";

export const createQuizSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  questions: Joi.string().required(),

});

export const updateQuizSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  questions: Joi.array().items(
    Joi.object({
      question: Joi.string().required(),
      type: Joi.string().required(),
      options: Joi.array().items(Joi.string()).required(),
      correctAnswers: Joi.array().items(Joi.string()).required(),
    })
  ),
});

