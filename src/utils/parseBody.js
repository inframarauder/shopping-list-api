module.exports = (body) => (typeof body === "string" ? JSON.parse(body) : body);
