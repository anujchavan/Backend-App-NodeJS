const { make } = require('simple-body-validator');
const { verifyToken } = require('../../utils');

const listAllPendingRequestsMiddleware = (req, res, next) => {
    const rs = verifyToken(req);
    if (rs.status == 'Fail') return res.json(rs);
    next();
}

const requestActionRules = {
    request_id: 'required|string',
    action: 'required|in:approve,reject',
};

const requestActionMiddleware = (req, res, next) => {
    const requestActionValidator = make(req.body, requestActionRules);
    if (!requestActionValidator.validate()) {
        console.log('Errors: ', requestActionValidator.errors().all());
        return res.json({ status: 'Fail', errors: requestActionValidator.errors().all() })
    }
    const rs = verifyToken(req);
    if (rs.status == 'Fail') return res.json(rs);
    next();
}

module.exports = { listAllPendingRequestsMiddleware, requestActionMiddleware };