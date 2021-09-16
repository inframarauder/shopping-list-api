const Responses = require("./utils/responses");
const db = require("./utils/db");

const TableName = process.env.DYNAMODB_TABLE;

exports.handler = async (event) => {
	try {
		let data = await db.list(TableName);
		return Responses._200({ message: "List of items", data });
	} catch (error) {
		console.error("Error in listing items", error);
		return Responses._500({ message: "Internal Server Error!" });
	}
};
