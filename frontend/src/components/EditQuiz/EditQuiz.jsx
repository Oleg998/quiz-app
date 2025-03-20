import QuestionnaireBuilder from "../QuestionnaireBuilder/QuestionnaireBuilder";
import { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import { getQuizByid } from "../api/api";
const EditQuiz = () => {
    const [quiz, setQuiz] = useState([]);
      const [error, setError] = useState(null);
    const { id } = useParams();
    // const navigate = useNavigate();
     useEffect(() => {
        const fetchQuizById = async (id) => {
         
          try {
            const { data } = await getQuizByid(id);
            setQuiz(data);
          } catch (err) {
            setError(err.message);
          } 
        };
          fetchQuizById(id);
      }, [id]);
    return <QuestionnaireBuilder quiz={quiz} />;
}

export default EditQuiz;