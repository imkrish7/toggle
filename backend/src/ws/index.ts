import {Server} from "socket.io"
import { authService } from "../Services/auth.service";
import { createSession } from "../Services/redis.service";

const socket = new Server({
	cors:{
		origin: "*"
	}
});

socket.use(async (_socket, next)=>{
	
	const token = _socket.handshake.auth.token;
	if(token){
		const _token = await authService.verify(token);
		// @ts-ignore
		_socket.request.token = _token;
		next()
	}else{
		next(new Error("Unauthorized"));
	}
	
})

socket.on("connection", async (_socket)=>{
	// @ts-ignore
	const { phoneNumber } = _socket.request.token;
	createSession(phoneNumber, _socket.id)
	_socket.on("new-post", (args)=>{
		console.log("new post has been created");	
	})
})

socket.on("connection_error", (err)=>{
	console.log(err);
})

export {
	socket
}