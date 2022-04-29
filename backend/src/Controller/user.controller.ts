import {Request, Response } from "express";
import { sendOTP } from "../Services/otp.service";
import { User } from "../Model/user.model";
import { IUser } from "../interfaces/IUser";
import { authService } from "../Services/auth.service";
import { deleteSession } from "../Services/redis.service"

const login = async (req: Request, res: Response)=>{
	try {
		let otp = Math.floor(Math.random() * (1000000-100000) + 100000);
		const { phoneNumber } = req.body;
		if(phoneNumber && phoneNumber.length > 0 && phoneNumber.length === 13){
		const user: IUser| null = await User.findOne({phoneNumber})
		if(user){
			user.OTP = otp.toString()
			await user.save();
		}else{
			const newUser = new User({
				phoneNumber,
				OTP: otp
			});

			await newUser.save();
		}
		await sendOTP(phoneNumber, otp.toString());
		return res.status(200).json({success: true})
	}else{
		return res.status(422).json({success: false, msg: "Phone number is missing"})
	}	
	
	} catch (error) {
		console.error(error);
		return res.status(400).json({succes: false, error: error})
	}	
}



const verifyOtp = async (req: Request, res: Response)=>{
	try {
		const { phoneNumber, otp } = req.body;
		const user: IUser | null = await User.findOne({phoneNumber});
		if(user){
			if(user.OTP === otp){
				user.OTP = null;
				await user.save();
				let token = await authService.sign({phoneNumber});
				return res.status(200).json({success: true, token})
			}else{
				return res.status(405).json({success: false, msg: "Wrong Otp"})
			}
		}else{
			return res.status(404).json({success: false, msg: "User does not exist"})
		}
	} catch (error) {
		console.error(error);
		return res.status(404).json({success: false, error})
	}
}

const logout = async (req: Request, res: Response)=>{
	try {
		const { phoneNumber } = req.body;
		const user: IUser | null = await User.findOne({phoneNumber});
		if(user){
			await deleteSession(phoneNumber);
			return res.status(200).json({success: true});
		}else{
			return res.status(404).json({success: false, msg: "User does not exist"})
		}
	} catch (error) {
		console.error(error);
		return res.status(404).json({success: false, error})
	}
}



export {
	login,
	verifyOtp,
	logout
}