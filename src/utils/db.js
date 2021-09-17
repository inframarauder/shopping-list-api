const AWS = require("aws-sdk");

AWS.config.update({
	region: process.env.REGION || "ap-south-1",
});

let options = {};

if (process.env.IS_OFFLINE) {
	options = {
		region: "localhost",
		endpoint: "http://localhost:8000",
	};
}

const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = {
	async list(TableName) {
		if (!TableName) {
			throw new Error("TableName is required");
		}
		const params = {
			TableName,
			ProjectionExpression: "#id, itemName, purchased, createdAt",
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
	async read(_id, TableName) {
		if (!_id) {
			throw new Error("_id is required");
		}
		if (!TableName) {
			throw new Error("TableName is required");
		}
		const params = {
			TableName,
			Key: {
				_id: _id,
			},
		};
		const response = await client.get(params).promise();
		if (!response) {
			throw new Error(`Failed to retrieve record with _id ${_id}`);
		}

		return response.Item;
	},
	async update(_id, data, TableName) {
		if (!_id) {
			throw new Error("_id is required");
		}
		if (!data) {
			throw new Error("data is required");
		}
		if (!TableName) {
			throw new Error("TableName is required");
		}
		const params = {
			TableName,
			Key: {
				_id,
			},
			UpdateExpression: "set #itemName= :itemName,  #purchased = :purchased",
			ExpressionAttributeNames: {
				"#itemName": "itemName",
				"#purchased": "purchased",
			},
			ExpressionAttributeValues: {
				":itemName": data.itemName,
				":purchased": data.purchased,
			},
			ReturnValues: "ALL_NEW",
		};

		const response = await client.update(params).promise();
		console.log(response);
		if (!response) {
			throw new Error(`Failed to update record with _id ${_id}`);
		}
		return { _id, ...data };
	},
};
