import styles from "./input.module.css";

const Input = ({
  id,
  label,
  value,
  onChange,
  className = "",
  placeholder = "",
}) => (
  <div className={styles.wrapper}>
    {label && (
      <label
        className={styles.label}
        htmlFor={id}
      >
        {label}
      </label>
    )}
    <input
      id={id}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${styles.input} ${className || ""}`.trim()}
    />
  </div>
);

export { Input };
