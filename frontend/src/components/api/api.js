import axios from "axios";
const BASE_URL = "https://quiz-app-t2qi.onrender.com/api/quiz";

export const getAllQuiz = () => {
  return axios.get(`${BASE_URL}`);
};