import Team from "../models/teamModel.js";
import fs from "fs";
export const getAllTeam = async (req, res) => {
  try {
    const response = await Team.find({});
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: `${error}` });
  }
};

export const addTeam = async (req, res) => {
  const { name, description, image } = req.body;
  try {
    await Team.create({
      name,
      image,
      description,
    });
    return res.status(200).json({ message: "Team member added Successfully" });
  } catch (error) {
    fs.unlink(`./uploads${image}`, (err) => {
      if (err) {
        return res.status(400).json({ error: `${err}` });
      }
      return res.status(400).json({ error: `${error}` });
    });
  }
};

export const deleteTeam = async (req, res) => {
  const { id } = req.params;
  try {
    const isExist = await Team.findById(id);
    if (!isExist) return res.status(200).json({ message: "Team doesnt exist" });
    fs.unlink(`./uploads${isExist.image}`, async (err) => {
      if (err) return res.status(400).json({ messgage: `${err}` });
      await Team.findByIdAndDelete(id);
      return res.status(200).json({ message: "Service successfully removed" });
    });
  } catch (error) {
    return res.status(400).json({ error: `${error}` });
  }
};
