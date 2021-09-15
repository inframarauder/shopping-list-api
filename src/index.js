exports.handler = (event) => {
	console.log(event.body);
	const { message } = event.body;

	const response = {
		isBase64Encoded: false,
		statusCode: 200,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message),
	};

	return response;
};
