import Findus from "../models/findusModel.js";
import fs from "fs";

export const getAllLocation = async (req, res) => {
  try {
    const response = await Findus.find({});
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: `${error}` });
  }
};
export const addLocation = async (req, res) => {
  const { title, url, image } = req.body;
  try {
    const response = await Findus.create({
      title,
      url,
      image,
    });
    return res.status(200).json({ message: "Location added successfully." });
  } catch (error) {
    fs.unlink(`./uploads${image}`, (err) => {
      if (err) return res.status(400).json({ messgage: `${err}` });
      return res.status(400).json({ messgage: `${error}` });
    });
  }
};

export const deleteLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const isExist = await Findus.findById(id);
    if (!isExist)
      return res.status(400).json({ message: "Location does not exist" });
    fs.unlink(`./uploads${isExist.image}`, async (err) => {
      if (err) return res.status(400).json({ messgage: `${err}` });
      await Findus.findByIdAndDelete(id);
      return res.status(200).json({ message: "Location successfully removed" });
    });
  } catch (err) {
    return res.status(400).json({ messgage: `${err}` });
  }
};
