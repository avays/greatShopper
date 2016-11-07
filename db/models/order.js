'use strict'

const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('APP/db')

const Order = db.define('orders', {
  orderNumber: {
    type: Sequelize.BIGINT,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    validate: {
      notEmpty: true,
    }
  },
  status: {
    type: Sequelize.ENUM('shipped', 'partially shipped', 'cancelled', 'pending', 'delivered', 'refunded') 
  },
  submitDate: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isDate: true
    }
  }
}, {
  indexes: [{fields: ['orderNumber'], unique: true,}],
  hooks: {
    afterCreate: fireEmailToCustomer
  }
})

function fireEmailToCustomer(user) {
  // fill in later
}

module.exports = Order