import express from "express";
import { adminCheck, userCheck } from "../middleware/userCheck.js";
import {
  addTraining,
  deleteTraining,
  getAllTraining,
} from "../controllers/trainingController.js";
import { fileCheck } from "../middleware/fileCheck.js";

import { notAllowed } from "../middleware/notAllowed.js";

const router = express.Router();

router
  .route("/")
  .get(getAllTraining)
  .post(userCheck, adminCheck, fileCheck, addTraining)
  .all(notAllowed);

router
  .route("/:id")
  .delete(userCheck, adminCheck, deleteTraining)
  .all(notAllowed);

export default router;
