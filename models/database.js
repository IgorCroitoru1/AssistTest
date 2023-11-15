const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://your_username:your_password@localhost:5432/your_database');

module.exports = sequelize;