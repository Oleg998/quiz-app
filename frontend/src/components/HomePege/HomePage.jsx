import styles from "./homepage.module.css";
import QuizCard from "../QuizCard/QuizCard";
import { useEffect, useState } from "react";
import Loader from "../ui/Spinner/Spinner";
import { getAllQuiz, deleteQuiz } from "../api/api";

const HomePage = () => {
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPage, setTotalPage] = useState("");

  useEffect(() => {
    const fetchAllQuiz = async () => {
      setIsLoading(true);
      try {
        const { data } = await getAllQuiz();
        setState(data.result); 
        setTotalPage(data.total);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllQuiz();
  }, []);
  
  const handleDeleteQuiz = async (id) => {
    try {
      await deleteQuiz(id);
      setState((prevState) => prevState.filter((quiz) => quiz._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };
console.log(state);

  return (
    <div className={styles.container}>
      {error && <h2>Error: {error}</h2>}
      {isLoading && <Loader />}
      <h1 className={styles.title}>Quiz Catalog</h1>
      <div className={styles.grid}>
        {state.map((quiz) => (
          <QuizCard
            key={quiz._id}
            id={quiz._id}
            title={quiz.title}
            description={quiz.description}
            questionCount={quiz.questions.length}
            completions={quiz.completions}
            onDelete={handleDeleteQuiz}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
