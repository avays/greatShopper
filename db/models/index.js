'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Address = require("./address")
const Payment = require("./payment")
const Order = require("./order")
const Order_Item = require("./order_item")
const Review = require("./review")

module.exports = {User, Address}