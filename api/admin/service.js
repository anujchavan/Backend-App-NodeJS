const { dbClient } = require('../../clients/database')

const listPendingRequests = async(req, res) => {
    try {
        const { user_id } = req;
        const [results] = await dbClient.query(`
                            select role from users where id = $1`, { bind: [user_id] });
        const { role } = results[0];
        if (role == 'user') {
            return res.json({ status: 'Fail', error: 'You are not admin' })
        }

        const [listOfPendingRequests] = await dbClient.query(`
                            select id as 'Request Id', 
                            product_name as 'Product Name',
                            quantity as 'Quantity',
                            status as 'Status' from requests where status = $1`, { bind: ['Pending'] });
        return res.json({ status: 'Success', data: listOfPendingRequests });
    } catch (error) {
        console.log('Errors: ', error);
        return res.json({ status: 'Fail', error: 'Internal server error' });
    }
}

const requestAction = async(req, res) => {
    try {
        const { user_id } = req;
        const { request_id, action } = req.body;
        const [results] = await dbClient.query(`
                        select role from users where id = $1`, { bind: [user_id] });
        const { role } = results[0];
        if (role == 'user') {
            return res.json({ status: 'Fail', error: 'You are not admin' })
        }

        await dbClient.query(`
                update requests
                set status = $1
                where id = $2;`, { bind: [action, request_id] });
        return res.json({ status: 'Success' });
    } catch (error) {
        console.log('Errors: ', error);
        return res.json({ status: 'Fail', error: 'Internal server error' });
    }
}

module.exports = { listPendingRequests, requestAction };