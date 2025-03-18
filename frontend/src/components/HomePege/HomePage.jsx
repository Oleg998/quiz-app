import styles from "./homepage.module.css";
import quizzesData from "../../assets/data/quiz.json";
import QuizCard from "../QuizCard/QuizCard";
const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.titel}>Quiz Catalog</h1>
      <div className={styles.grid}>
        {quizzesData.map((quiz) => (
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
