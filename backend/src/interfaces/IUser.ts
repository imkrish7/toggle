import { Document } from "mongoose";

export interface IUser extends Document{
	name: String,
	phoneNumber: String,
	bio?: String,
	image?: String,
	OTP: String | null
}