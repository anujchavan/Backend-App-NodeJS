const { Sequelize } = require('sequelize');

const dbClient = new Sequelize({
    dialect: 'sqlite',
    storage: `${process.cwd()}/db.sqlite`
});

module.exports = { dbClient };