exports.handler = async (event) => {
	console.log(event.body);
	const { message } = event.body;

	const response = {
		statusCode: 200,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message),
	};

	return response;
};
