import mongoose from "mongoose";
import { IPost } from "../interfaces/IPost";
const { Schema, model } = mongoose;


const postSchema = new Schema({
	isPrivate: Boolean,
	image: {
		url: String,
		caption: String
	},
	content: String,
	likes: {
		type: Number,
		default: 0
	},
	owner: String
}, {
	timestamps: {
		createdAt: "createdAt",
		updatedAt: "updatedAt"
	}
})

const Post = model<IPost>('Post', postSchema);

export {
	Post
}