const uuid = require("uuid");
const Responses = require("./utils/responses");
const db = require("./utils/db");

const TableName = process.env.DYNAMODB_TABLE;
const timestamp = new Date().getTime().toString();

exports.handler = async (event) => {
	const data = {
		...JSON.parse(event.body),
		purchased: false,
		_id: uuid.v4(),
		createdAt: timestamp,
		updatedAt: timestamp,
	};
	try {
		const item = await db.create(data, TableName);
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
