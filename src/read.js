const Responses = require("./utils/responses");
const db = require("./utils/db");

const TableName = process.env.DYNAMODB_TABLE;

exports.handler = async (event) => {
	const { id } = event.pathParameters;

	if (!id) {
		return Responses._400({ message: "_id is missing!" });
	}

	try {
		const data = await db.read(id, TableName);
		if (!data) {
			return Responses._404({ message: "Not found!" });
		}
		return Responses._200({ message: "Item retrieved", data });
	} catch (error) {
		console.error("Error in reading item", error);
		return Responses._500({ message: "Internal Server Error!" });
	}
};
