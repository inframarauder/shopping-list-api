const Responses = require("./utils/responses");

exports.handler = async (event) => {
	return Responses._200({ message: "API Healthy!" });
};
