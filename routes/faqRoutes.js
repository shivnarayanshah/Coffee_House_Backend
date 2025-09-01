import express from "express";
import { adminCheck, userCheck } from "../middleware/userCheck.js";
import {
  addFaqs,
  deleteFaqs,
  getAllFaqs,
} from "../controllers/faqController.js";
import { notAllowed } from "../middleware/notAllowed.js";

const router = express.Router();

router
  .route("/")
  .get(getAllFaqs)
  .post(userCheck, adminCheck, addFaqs)
  .all(notAllowed);

router.route("/:id").delete(userCheck, adminCheck, deleteFaqs).all(notAllowed);

export default router;
