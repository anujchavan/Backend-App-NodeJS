const { verify } = require("jsonwebtoken");

const verifyToken = (req) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        return { status: 'Fail', error: 'A token is required for authentication' };
    }
    try {
        const decoded = verify(token, process.env.JWT_SECRET_KEY);
        req.user_id = decoded.id;
        return { status: 'Success' };
    } catch (err) {
        return { status: 'Fail', error: 'A token is required for authentication' };
    }
}

module.exports = { verifyToken };