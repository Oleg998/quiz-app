
import styles from "./button.module.css";

const Button = ({ onClick, children, className = "" }) => (
  <button
    onClick={onClick}
    className={`${styles.button} ${className}`}
  >
    {children}
  </button>
);

export { Button };
