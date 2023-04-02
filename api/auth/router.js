const { Router } = require('express')
const { login, signup } = require('./service')
const { loginMiddleware, signupMiddleware } = require('./middlewares')
const authRouter = Router()

authRouter.post('/login', loginMiddleware, async(req, res) => {
    return await login(req, res);
})

authRouter.post('/signup', signupMiddleware, async(req, res) => {
    return await signup(req, res);
})

module.exports = authRouter;