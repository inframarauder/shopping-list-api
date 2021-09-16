const generateId = require("./utils/generateId");
const Responses = require("./utils/responses");
const db = require("./utils/db");

const TableName = process.env.DYNAMODB_TABLE;
const timestamp = new Date().toISOString();

exports.handler = async (event) => {
	const data = {
		...JSON.parse(event.body),
		_id: generateId(),
		createdAt: timestamp,
		updatedAt: timestamp,
	};
	try {
		const item = await db.write(data, TableName);
		if (!item) {
			return Responses._400({ message: "Could not create item" });
		} else {
			return Responses._201({ message: "Item created", data: item });
		}
	} catch (error) {
		console.error(error);
		return Responses._500({ message: "Internal Server Error!" });
	}
};
