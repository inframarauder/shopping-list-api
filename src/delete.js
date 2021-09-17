const Responses = require("./utils/responses");
const db = require("./utils/db");

const TableName = process.env.DYNAMODB_TABLE;

exports.handler = async (event) => {
	const { id } = event.pathParameters;
	if (!id) {
		return Responses._400({ message: "Missing id" });
	}

	try {
		await db.delete(id, TableName);
		return Responses._204({ message: "Deleted" });
	} catch (error) {
		console.error("Error in deleting item!", error);
		return Responses._500({ message: "Internal Server Error" });
	}
};
