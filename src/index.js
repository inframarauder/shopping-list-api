exports.handler = async (event) => {
	const { message } = event.body;
	await asyncJobSimulation();

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

function asyncJobSimulation() {
	return new Promise((resolve, reject) => {
		if (1 === 1) {
			resolve();
		} else {
			reject();
		}
	});
}
