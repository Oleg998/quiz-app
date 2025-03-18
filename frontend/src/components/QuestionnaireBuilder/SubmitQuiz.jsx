
import React from "react";
import { Button } from "../ui/Button/Button";
import styles from "./questionnaireBuilder.module.css";

const SubmitQuiz = ({ questions }) => {
  const submitQuestionnaire = async () => {
    try {
      const response = await fetch("/api/questionnaires", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions }),
      });

      if (response.ok) {
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
