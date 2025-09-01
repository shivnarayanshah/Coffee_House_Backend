import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    amount: { type: String, required: true },
    duration: { type: String, required: true },
  },
  { timestamps: true }
);

const Training = mongoose.model("training", trainingSchema);

export default Training;
