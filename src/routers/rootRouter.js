import express from "express";
import { home } from "../controllers/songController";
import { songList } from "../controllers/songController";
import { login } from "../controllers/songController";
import { save } from "../controllers/songController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.post("/", login);
//rootRouter.get("/list", songList);
rootRouter.post("/save", save);

export default rootRouter;
