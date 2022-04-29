import { Document } from "mongoose";

export interface IPost extends Document{
	isPrivate: Boolean,
	image?: {
		url: String,
		caption: String
	},
	content?: String,
	likes: Number,
	owner: String
}