import jwt from "jsonwebtoken";
import { IPayload } from "../interfaces/IPayload";

const authService = {
	verify: async(token: string)=>{
		try {
			let secret = process.env.AUTH_SECRET || "toggle313";
			return await jwt.verify(token, secret, { algorithms: ["HS512"] })
		} catch (error) {
			console.error(error)
		}
	},
	sign: async(payload: IPayload)=>{
		let exp = Math.floor(Date.now() / 1000) + (60*60);
		let secret = process.env.AUTH_SECRET || "toggle313";
		console.log(payload, secret);
		return await jwt.sign(payload, secret, {algorithm: "HS512"})
	},
	decoded: async (token: string)=>{
		try {
			return await jwt.decode(token)
		} catch (error) {
			console.error(error);
		}
	}
}

export {
	authService
}