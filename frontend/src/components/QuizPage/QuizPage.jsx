import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./quizPage.module.css";
import useFetchQuiz from "../hooks/useFetchQuiz";

const QuizPage = () => {
  const { quiz, isLoading, error } = useFetchQuiz();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(new Set());
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!quiz) return <p>No quiz found.</p>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerSelect = (option) => {
    setSelectedAnswers((prev) => {
      const newAnswers = new Set(prev);
      newAnswers.has(option)
        ? newAnswers.delete(option)
        : newAnswers.add(option);
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (
      selectedAnswers.size === currentQuestion.correctAnswers.length &&
      [...selectedAnswers].every((ans) =>
        currentQuestion.correctAnswers.includes(ans)
      )
    ) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswers(new Set());
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Set());
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
                className={selectedAnswers.has(option) ? styles.selected : ""}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={selectedAnswers.size === 0}
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
