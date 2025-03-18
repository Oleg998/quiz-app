import express from "express";
import {
  getAllQuiz,
  deleteQuiz,
  createQuiz,
  updateQuiz,
  getOneQuiz,
} from "../controllers/quizControllers.js";
import validId from "../middlewares/isValidId.js";


import validateBody from "../helpers/validateBody.js";
import { createQuizSchema, updateQuizSchema } from "../schemas/quizSchemas.js";

const quizRouter = express.Router();



quizRouter.get("/", getAllQuiz);

quizRouter.get("/:id", validId, getOneQuiz);

quizRouter.delete("/:id", validId, deleteQuiz);

quizRouter.post("/", validateBody(createQuizSchema), createQuiz);

quizRouter.put("/:id", validId, validateBody(updateQuizSchema), updateQuiz);



export default quizRouter;
