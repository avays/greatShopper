'use strict'

const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('APP/db');

const Payment = db.define('payments', {
  cardType: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  number_digest: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  number: {
    type: Sequelize.VIRTUAL,
    validate: {
      is: /^\d{13,16}$/
    }
  },
  expirationDate: {
    type:Sequelize.STRING,
    validate: {
      notEmpty: true,
      isDate: true
    }
  },
  name: {
    type: Sequelize.STRING,
    validate: {
      is: /^[a-z \.]+$/i,
      notEmpty: true
    }
  }
},{
  //indexes: [{fields: ['number'], unique: true,}],
  hooks: {
    beforeCreate: setNumber,
    beforeUpdate: setNumber,
  },
  instanceMethods: {
    authenticate(plaintext) {
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.number_digest,
          (err, result) =>
            err ? reject(err) : resolve(result))
        )
    }    
  }
});

function setNumber(payment) {
  return new Promise((resolve, reject) =>
    bcrypt.hash(payment.get('number'), 10, (err, hash) => {
      if (err) reject(err)
      payment.set('number_digest', hash)
      resolve(payment)
    })
  )
}

module.exports = Payment;