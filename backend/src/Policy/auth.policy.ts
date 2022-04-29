import { Request, Response, NextFunction } from "express";
import { authService } from "../Services/auth.service"

const authPolicy = async (req: Request, res: Response, next: NextFunction)=>{
	let token: string | null;
	if(req.header("Authorization")){
			const split = req.header("Authorization")?.split(" ");
			if(split?.length === 2){
				const scheme = split[0];
				const credential = split[1];
				let tokenType = /^Bearer$/
				if(tokenType.test(scheme)){
					token = credential;
				}else{
					return res.status(403).json({
						msg:"Format for Authorization: Bearer [token]"
					})
				}
			}else{
				return res.status(403).json({
						msg:"Format for Authorization: Bearer [token]"
					})
			}
		}else{
			return res.status(403).json({
						msg:"Format for Authorization: Bearer [token]"
					})
		}
	try {
		let data = await authService.verify(token);
		// @ts-ignore
		req.token = data;
		next();
	} catch (error) {
		return res.status(403).json({
						msg:"Format for Authorization: Bearer [token]"
					})
	}
}

export {
	authPolicy
}