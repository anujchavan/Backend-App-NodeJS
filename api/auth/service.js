const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { dbClient } = require('../../clients/database');

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const [results] = await dbClient.query(`
                        select id, password from users where email = $1`, { bind: [email] });
        if (!results.length) {
            return res.json({ status: 'Fail', error: 'Wrong Email' })
        }
        const { id, password: currentPassword } = results[0];
        const checkPwd = await bcrypt.compare(password, currentPassword);
        if (checkPwd) {
            const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "2h" });
            return res.json({ status: 'Success', token });
        } else {
            return res.json({ status: 'Fail', error: 'Wrong Password' })
        }
    } catch (error) {
        console.log('Errors: ', error);
        return res.json({ status: 'Fail', error: 'Internal server error' })
    }
}

const signup = async(req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const [results] = await dbClient.query(`
                        select id, password from users where email = $1`, { bind: [email] });
        if (results.length) {
            return res.json({ status: 'Fail', error: 'Email already exists' })
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        await dbClient.query(`
                        insert into users (name, email, password, role)
                        values ($1, $2, $3, $4)`, { bind: [name, email, encryptedPassword, role] })
        return res.json({ status: 'Success' })
    } catch (error) {
        console.log('Errors: ', error);
        return res.json({ status: 'Fail', error: 'Internal server error' });
    }
}

module.exports = { login, signup }