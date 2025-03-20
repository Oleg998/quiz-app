import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./QuizPage.module.css";
import { getQuizByid } from "../api/api";

const QuizPage = () => {
  const [quiz, setQuiz] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  
  
  useEffect(() => {
    const fetchQuizById = async (id) => {
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
      fetchQuizById(id);
  }, [id]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!quiz) return <p>No quiz found.</p>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerSelect = (option) => {
    setSelectedAnswers((prev) =>
      currentQuestion.type === "single"
        ? [option]
        : prev.includes(option)
        ? prev.filter((ans) => ans !== option)
        : [...prev, option]
    );
  };

  const handleNext = () => {
    const isCorrect =
      selectedAnswers.length === currentQuestion.correctAnswers.length &&
      new Set(selectedAnswers).size ===
        new Set(currentQuestion.correctAnswers).size &&
      selectedAnswers.every((ans) =>
        currentQuestion.correctAnswers.includes(ans)
      );

    if (isCorrect) setScore((prev) => prev + 1);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswers([]);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className={styles.quizContainer}>
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>

      {isCompleted ? (
        <div className={styles.resultContainer}>
          <h2>Quiz Completed!</h2>
          <p>
            Your score: {score} / {quiz.questions.length}
          </p>
          <button onClick={handleReset}>Retry</button>
          <button onClick={() => navigate("/")}>Home Page</button>
        </div>
      ) : (
        <div className={styles.questionContainer}>
          <h3>{currentQuestion.question}</h3>
          <div className={styles.optionsContainer}>
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                className={
                  selectedAnswers.includes(option) ? styles.selected : ""
                }
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={selectedAnswers.length === 0}
          >
            {currentQuestionIndex < quiz.questions.length - 1
              ? "Next"
              : "Finish"}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
