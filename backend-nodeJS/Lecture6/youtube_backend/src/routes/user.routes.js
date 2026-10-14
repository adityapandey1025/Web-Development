import { Router } from "express";
import { registerUser } from "../controllers/registerUser.controllers.js";
import { loginUser,loggedOutUser,refreshAccessToken,changePassword,getCurrentUser,updateAccountDetails,updateAvatar,updateCoverImage } from "../controllers/login.controllers.js";
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

router.route("/change-password").post(verifyJWT,changePassword);

router.route("/user-details").post(verifyJWT,getCurrentUser);


router.route("/update-textData").post(verifyJWT,updateAccountDetails);


router.route("/update-avatar").post(upload.single("avatar"),verifyJWT,updateAvatar);

router.route("/update-coverImage").post(upload.single("coverImage"),verifyJWT,updateCoverImage);





export default router;