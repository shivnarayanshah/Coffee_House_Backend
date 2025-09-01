import Career from "../models/careersModel.js";
import fs from "fs";

export const addCareer = async (req, res) => {
  const { title, description, post, duration, image } = req.body;
  try {
    const response = await Career.create({
      title,
      description,
      post,
      image,
      duration,
    });
    return res.status(200).json({ message: "Career added successfully" });
  } catch (error) {
    fs.unlink(`./uploads${image}`, (err) => {
      if (err) return res.status(400).json({ messgage: `${err}` });
      return res.status(400).json({ messgage: `${error}` });
    });
  }
};
export const getAllCareer = async (req, res) => {
  try {
    const response = await Career.find({});

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};
export const deleteCareer = async (req, res) => {
  const { id } = req.params;
  try {
    const isExist = await Career.findById(id);
    if (!isExist)
      return res.status(400).json({ message: "Career does not exist" });
    fs.unlink(`./uploads${isExist.image}`, async (err) => {
      if (err) return res.status(400).json({ messgage: `${err}` });
      await Career.findByIdAndDelete(id);
      return res.status(200).json({ message: "Career successfully removed" });
    });
  } catch (err) {
    return res.status(400).json({ messgage: `${err}` });
  }
};
