import express from "express";
import { home } from "../controllers/songController";
import { songList } from "../controllers/songController";

const rootRouter = express.Router();

rootRouter.get("/", home);

rootRouter.get("/list", songList);

export default rootRouter;
