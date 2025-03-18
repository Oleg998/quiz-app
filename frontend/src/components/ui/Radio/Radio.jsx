
import styles from "./radio.module.css";

const RadioGroup = ({ children }) => (
  <div className={styles.radioGroup}>{children}</div>
);

const Radio = ({ value, label, name, checked, onChange, disabled }) => (
  <label className={styles.radioLabel}>
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className={styles.radioInput}
    />
    <span>{label}</span>
  </label>
);

export { RadioGroup, Radio };
