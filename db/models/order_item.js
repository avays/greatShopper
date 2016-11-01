'use strict'

const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('APP/db')

const OrderItem = db.define('order_items', {
  status: {
    type: Sequelize.ENUM('shipped', 'partially shipped', 'cancelled', 'pending', 'delivered', 'refunded') // could we use ARRAY instead?
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  priceAtPurchase: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.0
  },
  shippingDate: { 
  	type: Sequelize.STRING,
	  validate: {
      isDate: true
    }
  },
  receiveDate: { 
    type: Sequelize.STRING,
    validate: {
      isDate: true
    }
  },
  taxCost: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.0,
  },
  shippingCost: {
    type: Sequelize.DECIMAL(10, 2),
   defaultValue: 0.0
  },
  itemsCost: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.0
  },
}, {
  hooks: {
    afterCreate: updateOrder
  },
  getterMethods: {
  	totalCost: function(){
  		return this.taxCost + this.shippingCost + this.itemCost;
  	}
  }
})

function updateOrder(orderItem) {
  // fill in later
}

module.exports = OrderItem