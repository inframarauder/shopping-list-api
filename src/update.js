const Responses = require("./utils/responses");
const db = require("./utils/db");

const TableName = process.env.DYNAMODB_TABLE;

exports.handler = async (event) => {
	const { id } = event.pathParameters;
	const body = JSON.parse(event.body);

	if (!id) {
		return Responses._400({ message: "_id is missing!" });
	}

	if (!body || Object.keys(body).length === 0) {
		return Responses._400({ message: "body is missing!" });
	}

	if (body.purchased && typeof body.purchased !== "boolean") {
		body.purchased = body.purchased === "false" ? false : true;
	}

	try {
		const data = await db.update(id, body, TableName);
		if (!data) {
			return Responses._404({ message: "Not found!" });
		}
		return Responses._200({ message: "Item updated", data });
	} catch (error) {
		console.error("Error in updating item", error);
		return Responses._500({ message: "Internal Server Error!" });
	}
};
