import { useState, useEffect } from "react";
import { Button } from "../ui/Button/Button";
import { Input } from "../ui/Input/Input";
import styles from "./questionnaireBuilder.module.css";
import AnswerInput from "./AnswerInput";
import SubmitQuiz from "./SubmitQuiz";
import QuestionEdit from "./QuestionEdit";

const QuestionnaireBuilder = ({ quiz }) => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [questionType, setQuestionType] = useState("text");
  const [options, setOptions] = useState([""]);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
    if (quiz?.questions) {
      setQuestions(quiz.questions);
    }
  }, [quiz]);

  const addQuestion = () => {
    const id = Date.now();
    if (!newQuestion.trim()) {
      alert("Text question cannot be empty.");
      return;
    }

    if (questionType === "text" && correctAnswers.length === 0) {
      alert("Text question answer cannot be empty.");
      return;
    }

    if (
      (questionType === "single" || questionType === "multiple") &&
      correctAnswers.length === 0
    ) {
      alert("Please ensure there is at least one correct answer.");
      return;
    }

    setQuestions([
      ...questions,
      {
        id: id,
        question: newQuestion,
        type: questionType,
        options: questionType !== "text" ? options : [],
        correctAnswers: correctAnswers,
      },
    ]);
    setNewQuestion("");
    setOptions([""]);
    setCorrectAnswers([]);
  };

  const removeAnswer = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const editQuestion = (id, newText, newOptions, newCorrectAnswers) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? {
              ...q,
              question: newText,
              options: newOptions,
              correctAnswers: newCorrectAnswers,
            }
          : q
      )
    );
  };

  const saveQuestion = (id, newText, newOptions, newCorrectAnswers) => {
    editQuestion(id, newText, newOptions, newCorrectAnswers);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Quiz</h2>
      <div className={styles.optionContainer}>
        <Input
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          label="Enter Question"
          className={styles.input}
        />
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          className={styles.select}
        >
          <option value="text">Text</option>
          <option value="single">Single choice</option>
          <option value="multiple">Multiple choice</option>
        </select>
      </div>

      <AnswerInput
        options={options}
        setOptions={setOptions}
        questionType={questionType}
        correctAnswers={correctAnswers}
        setCorrectAnswers={setCorrectAnswers}
        removeAnswer={removeAnswer}
      />

      <Button
        onClick={addQuestion}
        className={styles.button}
        disabled={!newQuestion || correctAnswers.length === 0}
      >
        ADD Question
      </Button>

      <QuestionEdit
        questions={questions}
        removeQuestion={removeQuestion}
        editQuestion={editQuestion}
        saveQuestion={saveQuestion}
      />

      <SubmitQuiz questions={questions} />
    </div>
  );
};

export default QuestionnaireBuilder;
