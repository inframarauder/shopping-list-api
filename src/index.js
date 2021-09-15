exports.handler = async (event) => {
	const { message } = event.body;

	return {
		statusCode: 200,
		message,
	};
};
