import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    post: { type: String, required: true },
    duration: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Career = mongoose.model("career", careerSchema);

export default Career;
