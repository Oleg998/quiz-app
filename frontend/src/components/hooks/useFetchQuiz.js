import { useState, useEffect } from "react";
import { getQuizByid } from "../api/api";
import { useParams } from "react-router-dom";

const useFetchQuiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchQuizById = async () => {
      setIsLoading(true);
      try {
        const { data } = await getQuizByid(id);
        setQuiz(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuizById();
  }, [id]);

  return { quiz, isLoading, error };
};

export default useFetchQuiz;
