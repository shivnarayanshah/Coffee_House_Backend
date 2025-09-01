import Menu from "../models/menuModel.js";
import fs from "fs";
export const getAllMenu = async (req, res) => {
  try {
    const response = await Menu.find({});
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: `${error}` });
  }
};

export const addMenu = async (req, res) => {
  const { title, price, image } = req.body;
  try {
    await Menu.create({ title, price, image });
    return res.status(200).json({ message: "Menu added successfully." });
  } catch (error) {
    fs.unlink(`./uploads${image}`, (err) => {
      if (err) return res.status(400).json({ messgage: `${err}` });
      return res.status(400).json({ messgage: `${error}` });
    });
  }
};

export const deleteMenu = async (req, res) => {
  const { id } = req.params;
  try {
    const isExist = await Menu.findById(id);
    if (!isExist)
      return res.status(400).json({ message: "Menu does not exist" });
    fs.unlink(`./uploads${isExist.image}`, async (err) => {
      if (err) return res.status(400).json({ messgage: `${err}` });
      await Menu.findByIdAndDelete(id);
      return res.status(200).json({ message: "Menu successfully removed" });
    });
  } catch (err) {
    return res.status(400).json({ messgage: `${err}` });
  }
};
