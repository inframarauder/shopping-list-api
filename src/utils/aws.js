const AWS = require("aws-sdk");

AWS.config.update({
	region: process.env.REGION || "ap-south-1",
});

module.exports = AWS;
