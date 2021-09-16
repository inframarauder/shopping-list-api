const AWS = require("aws-sdk");
const { error } = require("console");

AWS.config.update({
	region: process.env.REGION || "ap-south-1",
});

const client = new AWS.DynamoDB.DocumentClient();

module.exports = {
	async list(TableName) {
		if (!TableName) {
			throw new Error("TableName is required");
		}
		const params = {
			TableName,
			ProjectionExpression: "#id, itemName, purchased",
			ExpressionAttributeNames: {
				"#id": "_id",
			},
		};

		const allItems = [];

		const runScan = async (ExclusiveStartKey) => {
			if (ExclusiveStartKey) {
				params.ExclusiveStartKey = ExclusiveStartKey;
			}

			return client
				.scan(params)
				.promise()
				.then((data) => {
					allItems.push(...data.Items);
					if (typeof data.LastEvaluatedKey === "undefined") {
						return allItems;
					}
					return runScan(data.LastEvaluatedKey);
				})
				.catch((error) => {
					console.error("Error in scan operation", error);
					throw new Error("Error in scan operation");
				});
		};

		return runScan(undefined);
	},
	async create(data, TableName) {
		if (!data._id) {
			throw new Error("_id is required");
		}
		if (!TableName) {
			throw new Error("TableName is required");
		}
		const params = {
			TableName,
			Item: data,
		};

		const response = await client.put(params).promise();

		if (!response) {
			throw new Error(
				`Failed to write record with _id ${data._id} to table ${TableName}`
			);
		}
		return data;
	},
};
