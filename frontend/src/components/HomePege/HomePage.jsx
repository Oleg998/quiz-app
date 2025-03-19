import styles from "./homepage.module.css";
import quizzesData from "../../assets/data/quiz.json";
import QuizCard from "../QuizCard/QuizCard";
import { useEffect, useState } from "react";
import Loader from "../ui/Spinner/Spinner";
import { getAllQuiz } from "../api/api";

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
        console.log(data);
        
        setState(data.result);
        setTotalPage(data.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllQuiz();
  }, []);

  return (
    <div className={styles.container}>
      {error && <h2>Error: {error}</h2>}
      {isLoading && <Loader />}
      <h1 className={styles.title}>Quiz Catalog</h1>
      <div className={styles.grid}>
        {state.map((quiz) => (
          <QuizCard
            key={quiz.id}
            id={quiz.id}
            title={quiz.title}
            description={quiz.description}
            questionCount={quiz.questions.length}
            completions={quiz.completions}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
