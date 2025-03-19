import * as quizService from "../services/eventsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllQuiz = async (req, res, next) => {
  try {
    console.log(req.query);
    const { page = 1, limit = 9, } = req.query;
    const skip = (page - 1) * limit;
    const result = await quizService.listQuiz({}, { skip, limit });
    const total = await quizService.countQuiz();
    res.json(
      
      { result, total });
  } catch (error) {
    next(error);
  }
};

export const deleteQuiz = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await quizService.removeQuiz({ _id: id });
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createQuiz = async (req, res, next) => {
  try {
    const result = await quizService.addQuiz({
      ...req.body,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateQuiz = async (req, res, next) => {
  try {
    
    const id = req.params.id;
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }
    const result = await quizService.updateQuizByid(
      { _id: id },
      req.body
    );
    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};
export const getOneQuiz = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    
    const result = await quizService.getQuizById({ _id: id });
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

