import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
  },
  { timestamps: true }
);

const Menu = mongoose.model("menu", menuSchema);

export default Menu;
