'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')

const customOrderRoutes = require('express').Router() 

// customOrderRoutes.get("/", function(req, res, next){
// 	console.log("hello worold");
// 	res.send("Hello");
// })
// Custom routes go here.

module.exports = customOrderRoutes

// Epilogue will automatically create standard RESTful routes
const orders = epilogue.resource({
  model: db.model('orders'),
  endpoints: ['/orders', '/orders/:id']
})

const {mustBeLoggedIn, selfOnly, forbidden} = epilogue.filters
orders.delete.auth(mustBeLoggedIn)
orders.delete.auth(selfOnly)
orders.list.auth(forbidden("Verboten!"))
orders.read.auth(mustBeLoggedIn)