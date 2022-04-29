import { createClient } from "redis";

const client = createClient();

client.on("error", (error)=>{
	console.error(error);
})


const createSession = async (key: string, value: string)=>{
	return await client.set(key, value);
}

const getSession = async (key: string)=>{
	return await client.get(key);
}

const deleteSession = async(key: string)=>{
	return await client.del(key);
}


export {
	client,
	getSession,
	createSession,
	deleteSession
}