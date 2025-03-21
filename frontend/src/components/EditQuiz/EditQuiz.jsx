import QuestionnaireBuilder from "../QuestionnaireBuilder/QuestionnaireBuilder";
import useFetchQuiz from "../hooks/useFetchQuiz";

const EditQuiz = () => {
  const { quiz, error } = useFetchQuiz();

  if (error) return <p>Error: {error}</p>;
  if (!quiz) return <p>Loading...</p>;

  return <QuestionnaireBuilder quiz={quiz} />;
};

export default EditQuiz;
