import styles from "./quizCard.module.css";
import { Button } from "../ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Loader from "../ui/Spinner/Spinner";

const QuizCard = ({
  id,
  title,
  description,
  questionCount,
  completions,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); 
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsDeleting(false); 
    }
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <p className={styles.info}>Questions: {questionCount}</p>
      <p className={styles.info}>Completions: {completions}</p>
      <div className={styles.actions}>
        <div
          className={styles.menuContainer}
          ref={menuRef}
        >
          <button
            className={styles.menuButton}
            onClick={toggleMenu}
          >
            ⋮
          </button>
          {menuOpen && (
            <div className={styles.dropdownMenu}>
              <button
                onClick={() => {
                  navigate(`/edit/${id}`);
                  setMenuOpen(false);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  navigate(`/game/${id}`);
                  setMenuOpen(false);
                }}
              >
                Run
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? <Loader /> : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
