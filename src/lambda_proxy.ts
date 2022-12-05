import * as awsServerlessExpress from "aws-serverless-express";
import serverInstance from "./app";

const server = awsServerlessExpress.createServer(serverInstance);

console.log("Lambda loaded");
exports.handler = (event: any, context: any) => awsServerlessExpress.proxy(server, event, context); 