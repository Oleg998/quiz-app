import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const quizShema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: {
      question: { type: String, required: true },
      type: { type: String, required: true },
      options: { type: [String], required: true },
      correctAnswers: { type: [String], required: true },
    },
    statistics: {
      completions: { type: Number, default: 0 },
    },
  },
  { versionKey: false, timestamps: true }
);
quizShema.post("save", handleSaveError);
quizShema.pre("findOneAndUpdate", setUpdateSetting);
quizShema.post("findOneAndUpdate", handleSaveError);
const Quiz = model("quiz", quizShema);

export default Quiz;
