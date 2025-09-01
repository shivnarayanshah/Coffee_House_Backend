import express from "express";
import { searchAll } from "../controllers/searchController.js";
import { notAllowed } from "../middleware/notAllowed.js";

const router = express.Router();

router.route("/").get(searchAll).all(notAllowed);

export default router;
