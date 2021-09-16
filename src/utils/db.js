const AWS = require("aws-sdk");

AWS.config.update({
	region: process.env.REGION || "ap-south-1",
});

const client = new AWS.DynamoDB.DocumentClient();

module.exports = {
	async write(data, TableName) {
		if (!data._id) {
			throw new Error("_id is required");
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
