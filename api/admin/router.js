const { Router } = require('express');
const { listAllPendingRequestsMiddleware, requestActionMiddleware } = require('./middlewares');
const { listPendingRequests, requestAction } = require('./service');
const adminRouter = Router()

adminRouter.post('/listPendingRequests', listAllPendingRequestsMiddleware, async(req, res) => {
    return await listPendingRequests(req, res);
})
adminRouter.post('/requestAction', requestActionMiddleware, async(req, res) => {
    return await requestAction(req, res);
})

module.exports = adminRouter;