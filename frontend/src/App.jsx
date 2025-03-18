import HomePage from "./components/HomePege/HomePage"
import QuestionnaireBuilder from "./components/QuestionnaireBuilder/QuestionnaireBuilder"
import { Routes, Route } from "react-router-dom";
import QuizPage from "./components/QuizPage/QuizPage";
import quizzesData from "./assets/data/quiz.json"
function App() {


  return (
    <>
        <Routes>
          <Route
            path="/"
            element={<HomePage/>}
          />
          <Route
            path="game/:id"
            element={<QuizPage quizzes={quizzesData} />}
          />
        </Routes>
 
    </>
  );
}

export default App
