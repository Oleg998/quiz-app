
import styles from "./checkbox.module.css";

const Checkbox = ({ checked, onChange, disabled }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={onChange}
    disabled={disabled}
    className={styles.checkbox}
  />
);

export { Checkbox };
