'use strict'

const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('APP/db')

const Review = db.define('reviews', {
  text: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true,
      len: [100, 10000]
    }
  },
  stars: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  priceAtPurchase: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.0
  },
  date: { 
  	type: Sequelize.STRING,
	  validate: {
      isDate: true,
      notEmpty: true
    }
  },
  upVotes: { 
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      notEmpty: true
    }
  },
  downVotes: { 
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Review