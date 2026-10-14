import { Router } from "express";
import { registerUser } from "../controllers/registerUser.controllers.js";
import { loginUser,loggedOutUser,refreshAccessToken } from "../controllers/login.controllers.js";
import upload from '../middlewares/multer.middlewares.js'
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router=Router();

router.route("/register").post(upload.fields([
    {
        name:"avatar",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }
]),registerUser);


router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT,loggedOutUser);

router.route("/access-token").post(refreshAccessToken)


export default router;