import { Request, Response } from "express";
import { User } from "../Model/user.model";
import { Post } from "../Model/post.model";
import { IPost } from "../interfaces/IPost";
import { generatePresignedUrl } from "../Services/s3.service";
import { generateUUID } from "../Config/uuid.config";
import { getSession } from "../Services/redis.service";
import { socket } from "../ws";

const createPost = async (req: Request, res: Response)=>{
	try {
		// @ts-ignore
		const { phoneNumber } = req.token;
		const user = await User.findOne({phoneNumber})
		const {
			image,
			content,
			isPrivate
		} = req.body;
		if(user){
			let newPost = null;
			if(image){
				newPost = new Post({
					isPrivate,
					owner: user._id,
					image,
				})
			}else if(content){
				newPost = new Post({
					isPrivate,
					owner: user._id,
					content
				})
			}else{
				return res.status(422).json({
					success: false,
					msg: "Please fill all the required field"
				})
			}

			await newPost.save();
			const socket_id = await getSession(phoneNumber);
			if(socket_id){
				socket.to(socket_id).emit("new-post", {data: newPost})
			}
			return res.status(201).json({
				success: true,
				msg: "Post has been created"
			})
		}else{
			return res.status(403).json({
				success: false,
				msg: "Unauthorized"
			})
		}
		
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			msg: "Internal server error"
		})
	}
}

const getFeeds = async(req: Request, res: Response)=>{
	try {
		// @ts-ignore
		const { phoneNumber } = req.token;
		const user = await User.findOne({phoneNumber});
		if(user){
			const userPosts: Array<IPost> = await Post.find({
				phoneNumber
			})
			const othersPosts: Array<IPost> = await Post.find({
				isPrivate: false,
				phoneNumber: {$ne: phoneNumber}
			})
			return res.status(200).json({
				success: true,
				posts: [...userPosts, ...othersPosts]
			})
		}else{
			return res.status(403).json({
				success: false,
				msg: "Unauthorized"
			})
		}
	} catch (error) {
		console.error(error);
		return res.status(401).json({
			success: false,
			msg: "Unknown error"
		})
	}
}

const getOwnerFeed = async(req: Request, res: Response)=>{
	try {
		// @ts-ignore
		const { phoneNumber } = req.token;
		const user = await User.findOne({phoneNumber});
		if(user){
			const posts: Array<IPost> = await Post.find({
				isPrivate: true,
				owner: user._id
			})
			return res.status(200).json({
				success: true,
				posts
			})
		}else{
			return res.status(403).json({
				success: false,
				msg: "Unauthorized"
			})
		}
	} catch (error) {
		console.error(error);
		return res.status(401).json({
			success: false,
			msg: "Unknown error"
		})
	}
}

const togglePostPrivacy = async(req: Request, res: Response)=>{
	try {
		// @ts-ignore
		const { phoneNumber } = req.token;
		const { id: postId } = req.body; 
		const user = await User.findOne({phoneNumber});
		const post: IPost | null = await Post.findById({_id: postId})
		if(user){
			if(post && post.owner == user._id){
				post.isPrivate = !post.isPrivate;
				await post.save();
				return res.status(203).json({success: true})
			}else{
				return res.status(404).json({success: false, msg: "Post Doesn't exist"})
			}
		}else{
			return res.status(403).json({success: false, msg: "Unauthorized"})
		}
	} catch (error) {
		console.error(error);
		return res.status(401).json({
			success: false,
			msg: "Unknown error"
		})
	}
}

const deletePost = async(req: Request, res: Response)=>{
	try {
		// @ts-ignore
		const { phoneNumber } = req.token;
		const { id } = req.body;
		const user = await User.findOne({phoneNumber});
		const post: IPost | null = await Post.findById({_id: id})
		
		if(user){
			if(post && post.owner == user._id){
				await Post.findByIdAndDelete({_id: id})
				return res.status(203).json({success: true})
			}else{
				return res.status(404).json({success: false, msg: "Post Doesn't exist"})
			}
		}else{
			return res.status(403).json({success: false, msg: "Unauthorized"})
		}
	} catch (error) {
		console.error(error);
		return res.status(401).json({
			success: false,
			msg: "Unknown error"
		})
	}
}

const getPresignedUrl = async(req: Request, res: Response)=>{
	try {
		// @ts-ignore
		const { phoneNumber } = req.token;
		const { fileName, fileType, type  } = req.body;
		const user = await User.findOne({phoneNumber});
		let id = generateUUID();
		if(user){
			let key = `${user._id}/${id}/${fileName}`;
			let url = `${process.env.BUCKET_URL}/${key}`;
			let signedUrl = await generatePresignedUrl(key,fileType);
			return res.status(200).json({success: true, presigned: signedUrl, url})
		}else{
			return res.status(401).json({success: false, msg: "Unauthorized"})
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({success: false, error})
	}
}

export {
	createPost,
	getFeeds,
	getOwnerFeed,
	deletePost,
	togglePostPrivacy,
	getPresignedUrl
}