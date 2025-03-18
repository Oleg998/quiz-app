import  { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./QuizPage.module.css";



  const QuizPage= ({ quizzes }) => {
      const { id } = useParams();
        const navigate = useNavigate();
    const [quiz, setQuiz] = useState(undefined);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
  
    useEffect(() => {
      const foundQuiz = quizzes.find((q) => q.id === id);
      setQuiz(foundQuiz);
    }, [id, quizzes]);
  
    if (!quiz) {
      return <div>Quiz not find </div>;
    }
  
    const currentQuestion = quiz.questions[currentQuestionIndex];
  
    const handleAnswerSelect = (option) => {
      if (currentQuestion.type === "single") {
        setSelectedAnswers([option]);
      } else {
        setSelectedAnswers((prev) =>
          prev.includes(option) ? prev.filter((ans) => ans !== option) : [...prev, option]
        );
      }
    };
  
    const handleNext = () => {
      const isCorrect =
        selectedAnswers.length === currentQuestion.correctAnswers.length &&
        selectedAnswers.every((ans) => currentQuestion.correctAnswers.includes(ans));
  
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
            <h2>Quiz Done!</h2>
            <p>
              Your result: {score} из {quiz.questions.length}
            </p>
            <button onClick={handleReset}>Reset</button>
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
                : "End"}
            </button>
          </div>
        )}
      </div>
    );
  };
  
  export default QuizPage;