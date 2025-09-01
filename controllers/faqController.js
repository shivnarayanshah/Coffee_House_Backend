import Faqs from "../models/faqModel.js";

export const getAllFaqs = async (req, res) => {
  try {
    const response = await Faqs.find({});
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};

export const addFaqs = async (req, res) => {
  const { title, description } = req.body;

  try {
    await Faqs.create({
      title,
      description,
    });
    return res.status(200).json({ message: "Faqs added successfully" });
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};

export const deleteFaqs = async (req, res) => {
  const { id } = req.params;

  try {
    const isExist = await Faqs.findById(id);
    if (!isExist)
      return res.status(200).json({ message: "Faq does not exist." });
    await Faqs.findByIdAndDelete(id);
    return res.status(200).json({ message: "Faq deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};
