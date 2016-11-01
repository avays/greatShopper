'use strict'

const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('APP/db')

const Order = db.define('orders', {
  orderNumber: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    }
  },
  status: {
    type: Sequelize.ENUM('shipped', 'partially shipped', 'cancelled', 'pending', 'delivered') // could we use ARRAY instead?
  },
  taxSumCost: { // how do we want to do hook where taxSum must be updated when order items change?
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.0,
  },
  shippingCost: {
  	type: Sequelize.DECIMAL(10, 2),
	defaultValue: 0.0
  },
  itemsTotalCost: {
  	type: Sequelize.DECIMAL(10, 2),
  	defaultValue: 0.0,
  	validate: {
  		notEmpty: true
  	}
  },
  sumbitDate: {
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
  },
  getterMethods: {
  	orderTotalCost: function(){
  		return this.taxSumCost + this.shippingCost + this.itemsTotalCost;
  	}
  }
})

function fireEmailToCustomer(user) {
  // fill in later
}

module.exports = Order