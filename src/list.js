const Responses = require("./utils/responses");
const db = require("./utils/db");

const TableName = process.env.DYNAMODB_TABLE;

exports.handler = async (event) => {
	try {
		const { queryStringParameters } = event;

		let data = await db.list(TableName);

		//sort data in descending order of createdAt
		data = data.sort((a, b) => {
			let aDate = Number(a.createdAt);
			let bDate = Number(b.createdAt);

			return bDate - aDate;
		});

		//filter data based on query string params
		if (queryStringParameters) {
			data = data.filter((item) => {
				let condition = true;

				if (queryStringParameters.itemName) {
					condition =
						condition &&
						item.itemName
							.toLowerCase()
							.includes(queryStringParameters.itemName.toLowerCase());
				}

				if (queryStringParameters.purchased) {
					queryStringParameters.purchased =
						queryStringParameters.purchased === "false" ? false : true;
					condition =
						condition && item.purchased === queryStringParameters.purchased;
				}

				return condition;
			});
		}

		return Responses._200({ message: `${data.length} item(s) found`, data });
	} catch (error) {
		console.error("Error in listing items", error);
		return Responses._500({ message: "Internal Server Error!" });
	}
};
