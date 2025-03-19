import Quiz from "../models/Quiz.js";

export function listQuiz(filter, setting = {}) {
  return Quiz.find(filter, "-createdAt -updatedAt", setting);
}
export function countQuiz(filter) {
  return Quiz.countDocuments(filter);
}

export function getQuizById(filter) {
   return Quiz.findOne(filter);
}

export function addQuiz(data) {
  return Quiz.create(data);
}

export function removeQuiz(filter) {
  return Quiz.findOneAndDelete(filter);
}

export function updateQuizByid(filter, data) {
  return Quiz.findOneAndUpdate(filter, data);
}
