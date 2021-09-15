exports.handler = async (event) => {
	const { message } = event.body;

	const response = {
		statusCode: 200,
		headers: {
			"Content-Type": "application/json",
		},
		body: { message },
	};

	return response;
};
