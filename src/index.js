exports.handler = (event) => {
	const { message } = event.body;
	console.log(message);
	const response = {
		statusCode: 200,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		body: JSON.stringify(message),
	};

	return response;
};
