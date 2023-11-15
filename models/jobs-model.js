const sequelize = require('./database');
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const User = require('./user-model');

const Jobs = sequelize.define('Jobs',{
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
   title: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },

    location: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: false,
      },
    remote: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false,
    },
    job_types: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        unique: false,
    },
    added_by: {
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
Jobs.belongsTo(User, { foreignKey: 'added_by' });

module.exports = Jobs;