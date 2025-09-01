import Contact from "../models/contactModel.js";

export const addContact = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    await Contact.create({ name, email, subject, message });
    return res.status(200).json({
      message: "Thank You For Contacting Us , We will find you soon.",
    });
  } catch (error) {
    return res.status(400).json({
      message: `${error}`,
    });
  }
};

export const getAllContact = async (req, res) => {
  try {
    const response = await Contact.find({});
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const isExist = await Contact.findById(id);
    if (!isExist)
      return res.status(400).json({ message: "Contact doesnt exists" });
    await Contact.findByIdAndDelete(id);
    return res.status(200).json({ message: "Contact deleted successfully." });
  } catch (error) {
    return res.status(400).json({
      message: `${error}`,
    });
  }
};
