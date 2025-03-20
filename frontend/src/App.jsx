import HomePage from "./components/HomePege/HomePage"
import QuestionnaireBuilder from "./components/QuestionnaireBuilder/QuestionnaireBuilder"
import { Routes, Route } from "react-router-dom";
import QuizPage from "./components/QuizPage/QuizPage";
import quizzesData from "./assets/data/quiz.json"
import EditQuiz from "./components/EditQuiz/EditQuiz";
function App() {


  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="game/:id"
          element={<QuizPage quizzes={quizzesData} />}
        />
        <Route
          path="edit/:id"
          element={<EditQuiz quizzes={quizzesData} />}
        />
      </Routes>
    </>
  );
}

export default App
