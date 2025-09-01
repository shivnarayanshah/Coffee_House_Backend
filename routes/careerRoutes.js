import express from "express";
import { notAllowed } from "../middleware/notAllowed.js";
import {
  addCareer,
  deleteCareer,
  getAllCareer,
} from "../controllers/careerController.js";
import { adminCheck, userCheck } from "../middleware/userCheck.js";
import { fileCheck } from "../middleware/fileCheck.js";

const router = express.Router();

router
  .route("/")
  .get(getAllCareer)
  .post(userCheck, adminCheck, fileCheck, addCareer)
  .all(notAllowed);
router
  .route("/:id")
  .delete(userCheck, adminCheck, deleteCareer)
  .all(notAllowed);

export default router;
