import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";
const { Schema, model } = mongoose;

const userSchema = new Schema<IUser>({
	phoneNumber: String,
	name: String,
	bio: String,
	image: String,
	OTP: String
}, {
	timestamps: {
		createdAt: "createdAt",
		updatedAt: "updatedAt"
	}
})


const User = model<IUser>('User', userSchema)

export {
	User
}