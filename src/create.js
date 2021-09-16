const uuid = require("uuid");
const parseBody = require("./utils/parseBody");
const Response = require("./utils/response");
const AWS = require("aws-sdk");

const client = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
	const { body } = parseBody(event);
	const params = {
		TableName: process.env.DYNAMODB_TABLE,
		Item: {
			itemId: uuid.v4(),
			itemName: body.itemName,
			purchased: false,
		},
		ReturnValues: "ALL_NEW",
	};
	try {
		const data = await client.put(params);
		console.log(data);
		return new Response(200, JSON.stringify(data));
	} catch (error) {
		console.error("Error in create", error);
		return new Response(500, error.message);
	}
};
