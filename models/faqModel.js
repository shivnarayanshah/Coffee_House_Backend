import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Faqs = mongoose.model("faqs", faqSchema);
export default Faqs;
