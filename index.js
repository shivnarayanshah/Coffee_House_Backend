import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import userRoutes from "./routes/userRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import trainingRoutes from "./routes/trainingRoutes.js";
import faqsRoutes from "./routes/faqRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

import dotenv from "dotenv";
dotenv.config();
const server = express();

mongoose
  .connect(process.env.DB_URL)
  .then((val) => {
    server.listen(5000, () => {
      console.log(
        "Database is Connected server is listening at http://localhost:5000"
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

server.use(
  fileUpload({
    limits: { fileSize: 1 * 1024 * 1024 },
  })
);
server.use(express.static("uploads"));

server.use("/api/search", searchRoutes);

server.use("/api/users", userRoutes);
server.use("/api/career", careerRoutes);
server.use("/api/location", locationRoutes);
server.use("/api/menu", menuRoutes);
server.use("/api/service", serviceRoutes);
server.use("/api/team", teamRoutes);
server.use("/api/training", trainingRoutes);
server.use("/api/faqs", faqsRoutes);
server.use("/api/contact", contactRoutes);
