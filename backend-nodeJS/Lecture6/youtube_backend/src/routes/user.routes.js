import { Router } from "express";
import { registerUser } from "../controllers/registerUser.controllers.js";
import { loginUser,loggedOutUser,refreshAccessToken,changePassword,getCurrentUser,updateAccountDetails,updateAvatar,updateCoverImage, getUserChannelProfile, getWatchHistory } from "../controllers/login.controllers.js";
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

router.route("/current-user").get(verifyJWT,getCurrentUser);


router.route("/update-accountDetails").patch(verifyJWT,updateAccountDetails);


router.route("/update-avatar").patch(verifyJWT,upload.single("avatar"),updateAvatar);

router.route("/update-coverImage").patch(verifyJWT,upload.single("coverImage"),updateCoverImage);

router.route("/channel/:username").get(verifyJWT,getUserChannelProfile)


router.route("/history").get(verifyJWT,getWatchHistory)



export default router;