class Response {
	constructor(statusCode, body, headers) {
		this.statusCode = statusCode || 200;
		this.body = body || "OK";
		this.headers = headers || {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		};
	}
}

module.exports = Response;
