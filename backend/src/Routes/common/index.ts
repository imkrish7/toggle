import { Router } from "express";
import { login, verifyOtp } from "../../Controller/user.controller";


let router = Router();
router.post("/login", login);
router.post("/verify", verifyOtp);

export { 
	router
}

	

