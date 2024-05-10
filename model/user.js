const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('user-management', 'root', '', {
  dialect: 'mysql',
  host: '127.0.0.1',
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: false 
});

(async () => {
  try {
    await sequelize.sync();
    console.log("User model synced with database");
  } catch (error) {
    console.error("Error syncing User model:", error);
  }
})();

module.exports = User;
