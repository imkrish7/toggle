import {createServer} from "http"
import cors from "cors";
import mongoose from "mongoose";
import express, { Express } from "express";
import dotenv from "dotenv";
import { router as commonRoute} from "./Routes/common";
import { router as privateRoute } from "./Routes/private";
import { authPolicy } from "./Policy/auth.policy"
import { socket } from "./ws";
import { client } from "./Services/redis.service";

dotenv.config();
const app: Express = express();
const server = createServer(app);
socket.attach(server);

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/toggle")
mongoose.connection.on("error",(error)=>{
	console.error(error)
})

client.connect();

app.use("/api/v1", commonRoute);
app.use("/api/v1", authPolicy,privateRoute);
server.listen(process.env.PORT, ()=>{
	console.log(`Server is running at PORT: ${process.env.PORT}`);
})


