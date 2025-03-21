import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: [
      {
        question: { type: String, required: true },
        type: {
          type: String,
          enum: ["text", "single", "multiple"],
          required: true,
        },
        options: { type: [String], required: true, default: [] },
        correctAnswers: { type: [String], required: true, default: [] },
      },
    ],
    statistics: {
      completions: { type: Number, default: 0 },
    },
  },
  { versionKey: false, timestamps: true }
);

quizSchema.post("save", handleSaveError);
quizSchema.pre("findOneAndUpdate", setUpdateSetting);
quizSchema.post("findOneAndUpdate", handleSaveError);

const Quiz = model("quiz", quizSchema);

export default Quiz;
