const sequelize = require('sequelize')

const connection = new sequelize('qanda', 'root', '2004', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection