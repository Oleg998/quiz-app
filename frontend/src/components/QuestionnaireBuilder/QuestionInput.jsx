
import { Input } from "../ui/Input/Input";
import styles from "./questionnaireBuilder.module.css";

const QuestionInput = ({ newQuestion, setNewQuestion }) => (
  <div >
    <Input
      value={newQuestion}
      onChange={(e) => setNewQuestion(e.target.value)}
      label="Enter Question"
      className={styles.input}
    />
  </div>
);

export default QuestionInput;
