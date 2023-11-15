const { Sequelize, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('./database');

//const sequelize = new Sequelize('postgres://your_username:your_password@localhost:5432/your_database');


const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;