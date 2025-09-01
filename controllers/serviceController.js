import Service from "../models/serviceModel.js";
import fs from "fs";
export const getAllService = async (req, res) => {
  try {
    const services = await Service.find({});
    return res.status(200).json(services);
  } catch (error) {
    return res.status(400).json({ error: `${error}` });
  }
};

export const addService = async (req, res) => {
  const { title, description, image } = req.body;
  try {
    await Service.create({ title, description, image });
    return res.status(200).json({ message: "Service added Successfully." });
  } catch (error) {
    fs.unlink(`./uploads${image}`, (err) => {
      if (err) return res.status(400).json({ messgage: `${err}` });
      return res.status(400).json({ messgage: `${error}` });
    });
  }
  return res.status(200).json({ message: "this is addservice controller" });
};

export const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const isExist = await Service.findById(id);
    if (!isExist)
      return res.status(400).json({ message: "Service does not exist" });
    fs.unlink(`./uploads${isExist.image}`, async (err) => {
      if (err) return res.status(400).json({ messgage: `${err}` });
      await Service.findByIdAndDelete(id);
      return res.status(200).json({ message: "Service successfully removed" });
    });
  } catch (err) {
    return res.status(400).json({ messgage: `${err}` });
  }
};
