import Training from "../models/trainingModel.js";
import fs from "fs";

export const getAllTraining = async (req, res) => {
  try {
    const allTrainings = await Training.find({});

    return res.status(200).json(allTrainings);
  } catch (error) {
    return res.status(400).json(`${error}`);
  }
};

export const addTraining = async (req, res) => {
  const { title, description, amount, duration, image } = req.body;

  try {
    await Training.create({
      title,
      description,
      image,
      duration,
      amount,
    });
    return res.status(200).json({ message: "Training Added Successfully." });
  } catch (error) {
    return res.status(400).json(`${error}`);
  }
};

export const updateTraining = async (req, res) => {
  const { title, image, description, amount, duration } = req.body();
  const { id } = req.params;
  try {
    const trainingData = await Training.find(id);
    if (!trainingData) {
      return res.status(400).json({ message: "Traininig doesn't exists" });
    }
    trainingData.title = title || trainingData.title;

    trainingData.description = description || trainingData.description;
    trainingData.amount = amount || trainingData.amount;
    trainingData.duration = duration || trainingData.duration;
    if (image)
      fs.unlink(`./uploads${isExist.image}`, (err) => {
        if (err) return res.status(400).json({ messgage: `${err}` });
      });
    trainingData.image = image || trainingData.image;
    trainingData.save();
  } catch (error) {
    return res.status(400).json(`${error}`);
  }
};
export const deleteTraining = async (req, res) => {
  const { id } = req.params;
  try {
    const isExist = await Training.findById(id);
    if (!isExist)
      return res.status(400).json({ message: "Training Item doesnt exixt" });
    fs.unlink(`./uploads${isExist.image}`, async (err) => {
      if (err) return res.status(400).json({ error: `${err}` });
      await Training.findByIdAndDelete(id);
      return res.status(200).json({ message: "Training deleted successfully" });
    });
  } catch (error) {
    return res.status(400).json({ error: `${error}` });
  }
};
