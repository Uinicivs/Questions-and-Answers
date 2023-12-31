const sequelize = require('sequelize')
const connection = require('./database')

const answer = connection.define('answers', {
    response: {
        type: sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: sequelize.INTEGER,
        allowNull: false
    }
})

answer.sync({force: false})

module.exports = answer