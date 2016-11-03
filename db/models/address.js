'use strict'

const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('APP/db')

const Address = db.define('addresses', {
  alias: {
    type: Sequelize.STRING,
    // defaultValue: defaultAddress(),
    validate: {
      notEmpty: true
    }
  },
  name: {
    type: Sequelize.STRING,
    validate: {
      is: /^[a-z ]+$/i,
      notEmpty: true
    }
  },
  street1: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true
    }
  },
  street2: {
    type: Sequelize.TEXT
  },
  city: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING(2),
    validate: {
      notEmpty: true
    }
  },
  zip: {
    type: Sequelize.STRING,
     validate: {
      is: /^\d{5}(?:[-\s]\d{4})?$/,
      notEmpty: true
    }
  }
})

// function defaultAddress(){
//   return this.name;
// }

module.exports = Address;