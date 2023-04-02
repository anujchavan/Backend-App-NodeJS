const { make } = require('simple-body-validator');
const { verifyToken } = require('../../utils');

const createRequestRules = {
    product_name: 'required|string',
    quantity: 'required|numeric',
};

const createRequestMiddleware = (req, res, next) => {
    const createRequestValidator = make(req.body, createRequestRules);
    if (!createRequestValidator.validate()) {
        console.log('Errors: ', createRequestValidator.errors().all());
        return res.json({ status: 'Fail', errors: createRequestValidator.errors().all() })
    }
    const rs = verifyToken(req);
    if (rs.status == 'Fail') return res.json(rs);
    next();
}

const listRequestMiddleware = (req, res, next) => {
    const rs = verifyToken(req);
    if (rs.status == 'Fail') return res.json(rs);
    next();
}

const deleteRequestRules = {
    request_id: 'required|string',
};

const deleteRequestMiddleware = (req, res, next) => {
    const deleteRequestValidator = make(req.body, deleteRequestRules);
    if (!deleteRequestValidator.validate()) {
        console.log('Errors: ', deleteRequestValidator.errors().all());
        return res.json({ status: 'Fail', errors: deleteRequestValidator.errors().all() })
    }
    const rs = verifyToken(req);
    if (rs.status == 'Fail') return res.json(rs);
    next();
}

module.exports = { createRequestMiddleware, listRequestMiddleware, deleteRequestMiddleware }