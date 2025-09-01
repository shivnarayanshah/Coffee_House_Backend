import express from "express";
import {
  addContact,
  deleteContact,
  getAllContact,
} from "../controllers/contactController.js";
import { notAllowed } from "../middleware/notAllowed.js";
import { adminCheck, userCheck } from "../middleware/userCheck.js";

const router = express.Router();

router.route("/").get(getAllContact).post(addContact).all(notAllowed);

router
  .route("/:id")
  .delete(userCheck, adminCheck, deleteContact)
  .all(notAllowed);

export default router;
