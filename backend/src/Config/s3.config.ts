import { S3Client } from "@aws-sdk/client-s3";

const REGION = "ap-south-1";
const BUCKET_NAME= "togglebucket"
const EXPIRES_IN = 14400


const _allowedMethods: any[] = [];
  process.argv.forEach(function (val, index, array) {
    if (val.toUpperCase() === "POST") {
      _allowedMethods.push("POST");
    }
    if (val.toUpperCase() === "GET") {
      _allowedMethods.push("GET");
    }
    if (val.toUpperCase() === "PUT") {
      _allowedMethods.push("PUT");
    }
    if (val.toUpperCase() === "PATCH") {
      _allowedMethods.push("PATCH");
    }
    if (val.toUpperCase() === "DELETE") {
      _allowedMethods.push("DELETE");
    }
    if (val.toUpperCase() === "HEAD") {
      _allowedMethods.push("HEAD");
    }
  });

  const thisConfig = {
	AllowedHeaders: ["Authorization"],
	AllowedMethods: _allowedMethods,
	AllowedOrigins: ["*"],
	ExposeHeaders: [],
};

const corsRules = new Array(thisConfig)
const s3 = new S3Client({ region: REGION })
export {
	s3,
	BUCKET_NAME,
	EXPIRES_IN,
	corsRules
}