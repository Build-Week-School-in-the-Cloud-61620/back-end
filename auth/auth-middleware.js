const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = (req, res, next) => {
    const [directive, token] = req.headers.authorization.split(" ");
	if (!directive || directive !== "Bearer") {
		res.status(401).json({ error: "with directive in auth middleware" });
	}

	if (token) {
		jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
			if (err) {
				res.status(401).json({ message: "valid token needed", reason: err.message });
			} else {
				req.decodedToken = decodedToken;

				next();
			}
		});
	} else {
		res.status(401).json({ message: "no token found" });
	}
};
