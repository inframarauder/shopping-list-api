const Responses = require("./utils/responses");
const db = require("./utils/db");

const TableName = process.env.DYNAMODB_TABLE;

exports.handler = async (event) => {
	try {
		const data = await db.list(TableName);

		//sorting records in descending order of createdAt
		data = data.sort((a, b) => {
			const aDate = new Date(a.createdAt);
			const bDate = new Date(b.createdAt);

			return bDate.getTime() - aDate.getTime();
		});

		return Responses._200({ message: "List of items", data });
	} catch (error) {
		console.error("Error in listing items", error);
		return Responses._500({ message: "Internal Server Error!" });
	}
};
