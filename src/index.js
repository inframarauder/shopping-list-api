exports.handler = (event) => {
	console.log(event.body);
	const { message } = event.body;

	const response = {
		statusCode: 200,
		body: JSON.stringify(message),
	};

	return response;
};
