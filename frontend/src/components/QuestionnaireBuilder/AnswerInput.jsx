import { Input } from "../ui/Input/Input";
import { Checkbox } from "../ui/Checkbox/Checkbox";
import { Button } from "../ui/Button/Button";
import styles from "./questionnaireBuilder.module.css";

const AnswerInput = ({
  options,
  setOptions,
  questionType,
  correctAnswers,
  setCorrectAnswers,
  removeAnswer,
}) => {

  const handleCorrectAnswerChange = (option, isChecked) => {
    if (questionType === "text") {
      setCorrectAnswers([option]);
    } else if (questionType === "single") {
      setCorrectAnswers([option]);
    } else if (questionType === "multiple") {
      if (isChecked) {
        setCorrectAnswers([...correctAnswers, option]);
      } else {
        setCorrectAnswers(correctAnswers.filter((answer) => answer !== option));
      }
    }
  };

  const isValid =
    questionType === "text"
      ? options[0]?.trim().length > 0 && correctAnswers[0]?.trim().length > 0
      : correctAnswers.length > 0;

  return (
    <>
      {questionType === "text" ? (
        <div className={styles.textContainer}>
          <Input
            placeholder="Correct answer"
            className={styles.input}
            value={correctAnswers[0] || ""}
            onChange={(e) => setCorrectAnswers([e.target.value])}
          />
        </div>
      ) : (
        options.map((option, index) => (
          <div
            key={index}
            className={styles.optionContainer}
          >
            <Input
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              placeholder={`Choice ${index + 1}`}
              className={styles.input}
            />

            <Checkbox
              checked={correctAnswers.includes(option)}
              onChange={(e) =>
                handleCorrectAnswerChange(option, e.target.checked)
              }
              className={styles.checkbox}
            >
              Answer
            </Checkbox>

            <Button
              onClick={() => removeAnswer(index)}
              className={styles.button}
            >
              Remove Choice
            </Button>
          </div>
        ))
      )}

      {questionType !== "text" && (
        <Button
          onClick={() => setOptions([...options, ""])}
          className={styles.button}
          disabled={options.length === 0 || !isValid}
        >
          ADD Choice
        </Button>
      )}

      {!isValid && (
        <p className={styles.errorMessage}>
          {questionType === "text"
            ? "Text answer and correct answer cannot be empty."
            : "Please select at least one correct answer."}
        </p>
      )}
    </>
  );
};

export default AnswerInput;
