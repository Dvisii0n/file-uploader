import { Router } from "express";
import homeController from "../controllers/homeController.js";
import { uploadFiles } from "../middleware/multer.js";

const homeRouter = new Router();

homeRouter.get("/", homeController.getHome);

homeRouter.post("/upload", uploadFiles, homeController.uploadFiles);

export default homeRouter;
