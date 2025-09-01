import express from "express";
import { notAllowed } from "../middleware/notAllowed.js";
import {
  addService,
  deleteService,
  getAllService,
} from "../controllers/serviceController.js";
import { adminCheck, userCheck } from "../middleware/userCheck.js";
import { fileCheck } from "../middleware/fileCheck.js";

const router = express.Router();

router
  .route("/")
  .get(getAllService)
  .post(userCheck, adminCheck, fileCheck, addService)
  .all(notAllowed);

router.route("/:id").delete(userCheck, adminCheck, deleteService);

export default router;
