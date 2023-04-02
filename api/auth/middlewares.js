const { make } = require('simple-body-validator');

const loginRules = {
    email: 'required|email',
    password: 'required|min:8',
};

const loginMiddleware = (req, res, next) => {
    const loginValidator = make(req.body, loginRules);
    if (!loginValidator.validate()) {
        console.log('Errors: ', loginValidator.errors().all());
        return res.json({ status: 'Fail', errors: loginValidator.errors().all() })
    }
    next();
}

const signUpRules = {
    name: 'required|string',
    password: 'required|min:8',
    confirm_password: 'required|same:password|min:8',
    email: 'required|email',
    role: 'required|in:user,admin',
};

const signupMiddleware = (req, res, next) => {
    const signUpValidator = make(req.body, signUpRules);
    if (!signUpValidator.validate()) {
        console.log('Errors: ', signUpValidator.errors().all());
        return res.json({ status: 'Fail', errors: signUpValidator.errors().all() })
    }
    next();
}

module.exports = { loginMiddleware, signupMiddleware }