// Import necessary modules
const jsonwebtoken = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY;
// Middleware function to verify JWT
const verifyJwt = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) {
        return res.status(401).send({ status: false, message: "Token required" });
    }

    jsonwebtoken.verify(token, secret_key, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.user = decoded;
        next();
    });
};

// Export the verifyJwt function
module.exports = { verifyJwt };
