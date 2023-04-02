const { dbClient } = require('../../clients/database')

const createRequest = async(req, res) => {
    try {
        const { user_id } = req;
        const { product_name, quantity } = req.body;

        const [_, metaData] = await dbClient.query(`
                            insert into requests (user_id, product_name, quantity, status)
                            values ($1, $2, $3, $4)`, { bind: [user_id, product_name, quantity, 'Pending'] })
        const { lastID: request_id } = metaData;
        return res.json({ status: 'Success', request_id })
    } catch (error) {
        console.log('Errors: ', error);
        return res.json({ status: 'Fail', error: 'Internal server error' });
    }
}

const listRequest = async(req, res) => {
    try {
        const { user_id } = req;
        const [results] = await dbClient.query(`
                            select id as 'Request Id', 
                            product_name as 'Product Name',
                            quantity as 'Quantity',
                            status as 'Status' from requests where deleted = false and user_id = $1`, { bind: [user_id] });
        return res.json({ status: 'Success', data: results });
    } catch (error) {
        console.log('Errors: ', error);
        return res.json({ status: 'Fail', error: 'Internal server error' });
    }
}

const deleteRequest = async(req, res) => {
    const { user_id } = req;
    const { request_id } = req.body;
    const [results] = await dbClient.query(`
                            select status, deleted from requests where id = $1 and user_id = $2`, { bind: [request_id, user_id] });
    const { status, deleted } = results[0];
    //return res.json({ status: 'Success' });
    if (deleted) {
        return res.json({ status: 'Fail', error: 'Request is already deleted' });
    }

    if (status == 'Pending') {
        await dbClient.query(`
                update requests
                set deleted = true
                where id = $1;`, { bind: [request_id] });
        return res.json({ status: 'Success' });
    } else {
        return res.json({ status: 'Fail', error: 'Request is not in pending state' });
    }
}

module.exports = { createRequest, listRequest, deleteRequest }