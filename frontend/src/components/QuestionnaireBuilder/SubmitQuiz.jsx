
import { updateQuiz } from "../api/api";
import { Button } from "../ui/Button/Button";
import styles from "./questionnaireBuilder.module.css";

const SubmitQuiz = ({ id, questions }) => {
   console.log(questions);
  const submitQuestionnaire = async () => {
    try {
      const response = await updateQuiz(id, { questions });

      if (response.status === 200) {
        alert("Quiz successfully submitted!");
      } else {
        alert("Error submitting the quiz.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the quiz.");
    }
  };

  return (
    <Button
      onClick={submitQuestionnaire}
      className={styles.button}
    >
      Save Quiz
    </Button>
  );
};

 

export default SubmitQuiz;
