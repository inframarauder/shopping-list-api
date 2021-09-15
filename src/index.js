exports.handler = async (event) => {
	const { message } =
		typeof event.body === "string" ? JSON.parse(event.body) : event.body;

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
