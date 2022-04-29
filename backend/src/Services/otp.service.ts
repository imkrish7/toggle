import twilio from "twilio";

const ACCOUNT_SID = process.env.ACCOUNT_SID || "AC7f5203ebffe6a5a9023d4e5b5c8697ec";
const ACCOUNT_TOKEN = process.env.ACCOUNT_TOKEN || "c67b0037dcc57091b3c84b58a36b45de";
const AUHT_PHONE= process.env.AUTH_PHONE || "+12392913983";
let client = twilio(ACCOUNT_SID, ACCOUNT_TOKEN);


const sendOTP = async (phoneNumber: string, code: string)=>{
	console.log("sid",ACCOUNT_SID);
	try {
		await client.messages.create({to: phoneNumber, from: AUHT_PHONE, body: `login secret ${code}` });	
	} catch (error) {
		console.error(error);
		return error;
	}	
}


export {
	sendOTP
}