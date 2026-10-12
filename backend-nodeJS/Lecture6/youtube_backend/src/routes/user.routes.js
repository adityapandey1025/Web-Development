import { Router } from "express";
import { registerUser } from "../controllers/registerUser.controllers.js";

import upload from '../middlewares/multer.middlewares.js'

const router=Router();

router.route("/register").post(
    (req, res, next) => {
    console.log("Content-Type:", req.headers["content-type"]);
    next();
  },upload.fields([
    {
        name:"avatar",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }
]),registerUser);

export default router;