import { useState } from "react";
import { Button } from "../ui/Button/Button";
import { Input } from "../ui/Input/Input";
import styles from "./questionnaireBuilder.module.css";
import AnswerInput from "./AnswerInput";

const QuestionEdit = ({ questions, removeQuestion, saveQuestion }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedOptions, setEditedOptions] = useState([]);
  const [editedCorrectAnswers, setEditedCorrectAnswers] = useState([]);

  const startEditing = (id, question, options, correctAnswers) => {
    setEditingId(id);
    setEditedQuestion(question);
    setEditedOptions(options);
    setEditedCorrectAnswers(correctAnswers);
  };

  const handleSave = (id) => {
    saveQuestion(id, editedQuestion, editedOptions, editedCorrectAnswers);
    setEditingId(null);
  };

  const handleQuestionChange = (e) => {
    setEditedQuestion(e.target.value);
  };

  return (
    <div className={styles.questionsContainer}>
      {questions.map((q, index) => (
        <div
          key={q.id}
          className={styles.questionCard}
        >
          <div className={styles.questionHeader}>
            <strong>Question {index + 1}: </strong>

            {editingId === q.id ? (
              <div>
                <Input
                  value={editedQuestion}
                  onChange={handleQuestionChange}
                  className={styles.input}
                />

                <AnswerInput
                  options={editedOptions}
                  setOptions={setEditedOptions}
                  questionType={q.type}
                  correctAnswers={editedCorrectAnswers}
                  setCorrectAnswers={setEditedCorrectAnswers}
                  removeAnswer={(index) => {
                    const newOptions = [...editedOptions];
                    newOptions.splice(index, 1);
                    setEditedOptions(newOptions);
                    const newCorrectAnswers = [...editedCorrectAnswers];
                    newCorrectAnswers.splice(index, 1);
                    setEditedCorrectAnswers(newCorrectAnswers);
                  }}
                />

                <Button
                  onClick={() => handleSave(q.id)}
                  className={styles.button}
                >
                  Save
                </Button>
                <Button
                  onClick={() => setEditingId(null)}
                  className={styles.button}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <span>{q.question}</span>
                <Button
                  onClick={() =>
                    startEditing(q.id, q.question, q.options, q.correctAnswers)
                  }
                  className={styles.button}
                >
                  Edit Question
                </Button>
              </>
            )}

            <Button
              onClick={() => removeQuestion(q.id)}
              className={styles.button}
            >
              Remove Question
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionEdit;
