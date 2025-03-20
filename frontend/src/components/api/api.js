import axios from "axios";
const BASE_URL = "https://quiz-app-t2qi.onrender.com/api/quiz";

export const getAllQuiz = () => {
  return axios.get(`${BASE_URL}`);
};

export const deleteQuiz = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export const getQuizByid = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};