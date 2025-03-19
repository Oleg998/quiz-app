
import styles from "./spiner.module.css"

const Loader = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.spinner}></div>
      </div>
    );
};

export default Loader;
