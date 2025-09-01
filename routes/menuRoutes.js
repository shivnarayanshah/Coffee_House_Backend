import express from "express";
import { adminCheck, userCheck } from "../middleware/userCheck.js";
import {
  addMenu,
  deleteMenu,
  getAllMenu,
} from "../controllers/menuController.js";
import { notAllowed } from "../middleware/notAllowed.js";
import { fileCheck } from "../middleware/fileCheck.js";

const router = express.Router();

router
  .route("/")
  .get(getAllMenu)
  .post(userCheck, adminCheck, fileCheck, addMenu)
  .all(notAllowed);

router.route("/:id").delete(userCheck, adminCheck, deleteMenu).all(notAllowed);

export default router;
