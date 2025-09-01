import express from "express";
import { adminCheck, userCheck } from "../middleware/userCheck.js";
import { fileCheck } from "../middleware/fileCheck.js";
import {
  addTeam,
  deleteTeam,
  getAllTeam,
} from "../controllers/teamController.js";
import { notAllowed } from "../middleware/notAllowed.js";

const router = express.Router();

router
  .route("/")
  .get(getAllTeam)
  .post(userCheck, adminCheck, fileCheck, addTeam)
  .all(notAllowed);

router.route("/:id").delete(userCheck, adminCheck, deleteTeam).all(notAllowed);

export default router;
