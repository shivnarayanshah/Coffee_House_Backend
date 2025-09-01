import mongoose from "mongoose";

const findusSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

const Findus = mongoose.model("findus", findusSchema);

export default Findus;
