import  express  from "express";
import { signupController,loginController } from "../controllers/login";

const router=express.Router();

router.post("/signup",signupController);
router.post("/login",loginController)

export default router
