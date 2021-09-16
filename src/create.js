const parseBody = require("./utils/parseBody");
const generateId = require("./utils/generateId");
const Response = require("./utils/response");
const AWS = require("aws-sdk");

const client = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
	const { body } = parseBody(event);
	const timestamp = new Date().toISOString();
	const params = {
		TableName: process.env.DYNAMODB_TABLE,
		Item: {
			itemId: generateId(),
			itemName: body.itemName,
			purchased: false,
			createdAt: timestamp,
			updatedAt: timestamp,
		},
	};
	try {
		const data = await client.put(params).promise();
		console.log(data);
		const response = new Response(200, JSON.stringify(params.Item));
		return response;
	} catch (error) {
		console.error("Error in create", error);
		return new Response(500, error.message);
	}
};
