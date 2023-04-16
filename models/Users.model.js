import { DataTypes } from 'sequelize'
import { sequelize } from '../db/db.js'

export const Users = sequelize.define('users', {
  name: {
    type: DataTypes.STRING(40),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  timestamps: false
})
