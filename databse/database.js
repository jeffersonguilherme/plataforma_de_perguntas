const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', 'jefferson123',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;