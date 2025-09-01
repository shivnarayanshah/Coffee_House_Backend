import express from "express";
import { notAllowed } from "../middleware/notAllowed.js";
import {
  addLocation,
  deleteLocation,
  getAllLocation,
} from "../controllers/findusController.js";
import { adminCheck, userCheck } from "../middleware/userCheck.js";
import { fileCheck } from "../middleware/fileCheck.js";

const router = express.Router();

router
  .route("/")
  .get(getAllLocation)
  .post(userCheck, adminCheck, fileCheck, addLocation)
  .all(notAllowed);
router.route("/:id").delete(userCheck, adminCheck, deleteLocation);

export default router;
