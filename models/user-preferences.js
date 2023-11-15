const sequelize = require('./database');
const { v4: uuidv4 } = require('uuid');
const DataTypes = require('sequelize');
const User = require('./user-model')
const UserPreferences = sequelize.define('UserPreferences',{
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
    timezone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
          model: User,
          key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
  },
})

UserPreferences.belongsTo(User, { foreignKey: 'user_id' });

module.exports = UserPreferences;