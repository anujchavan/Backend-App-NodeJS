const { Router } = require('express')
const { createRequest, listRequest, deleteRequest } = require('./service')
const { createRequestMiddleware, listRequestMiddleware, deleteRequestMiddleware } = require('./middlewares');
const usersRouter = Router()

usersRouter.post('/createRequest', createRequestMiddleware, async(req, res) => {
    return await createRequest(req, res);
})
usersRouter.post('/listRequests', listRequestMiddleware, async(req, res) => {
    return await listRequest(req, res);
})
usersRouter.post('/deleteRequest', deleteRequestMiddleware, async(req, res) => {
    return await deleteRequest(req, res);
})

module.exports = usersRouter;