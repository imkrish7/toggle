import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3, BUCKET_NAME, EXPIRES_IN, corsRules } from "../Config/s3.config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const generatePresignedUrl = async (key: string, objectName: string)=>{
	let bucketParams = {
		Bucket: BUCKET_NAME,
		Key: key,
		ACL: "public-read",
		contentType: objectName
	}

	try {
		let command = new PutObjectCommand(bucketParams);
		const signedUrl = await getSignedUrl(s3, command, {
			expiresIn: EXPIRES_IN
		} )
		return signedUrl
	} catch (error) {
		console.error(error);
		return null;
	}

}

const uploadImagePost = async (key:string, object:any)=>{
	let bucketParams = {
		Bucket: BUCKET_NAME,
		Key: key,
		Body: object
	}

	try {
		const data = await s3.send(new PutObjectCommand(bucketParams));
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

const deleteObject = async(key: string)=>{
	let bucket= {
		Bucket: BUCKET_NAME,
		Key: key
	}
	try {
		let command = new DeleteObjectCommand(bucket);
		await s3.send(command);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

export {
	generatePresignedUrl,
	uploadImagePost,
	deleteObject
}
