// controllers/searchController.js
import Menu from "../models/menuModel.js";
import Service from "../models/serviceModel.js";
import Training from "../models/trainingModel.js";
import Findus from "../models/findusModel.js";

export const searchAll = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ message: "Keyword is required" });
    }

    const searchRegex = new RegExp(keyword, "i");

    const [menuResults, serviceResults, trainingResults, findUsResult] =
      await Promise.all([
        Menu.find({
          $or: [{ title: searchRegex }],
        }),
        Service.find({
          $or: [{ title: searchRegex }, { description: searchRegex }],
        }),
        Training.find({
          $or: [{ title: searchRegex }, { description: searchRegex }],
        }),
        Findus.find({
          $or: [{ title: searchRegex }],
        }),
      ]);

    return res.status(200).json({
      keyword,
      menuResults,
      serviceResults,
      trainingResults,
      findUsResult,
    });
  } catch (error) {
    return res.status(500).json({ message: "Search failed", error });
  }
};
