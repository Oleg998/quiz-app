import styles from "./card.module.css";

const Card = ({ children }) => <div className={styles.card}>{children}</div>;

const CardContent = ({ children }) => (
  <div className={styles.cardContent}>{children}</div>
);

export { Card, CardContent };
