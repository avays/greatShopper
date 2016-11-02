'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')

const customOrderItemRoutes = require('express').Router() 

// customOrderItemRoutes.get("/", function(req, res, next){
// 	console.log("hello worold");
// 	res.send("Hello");
// })
// Custom routes go here.

module.exports = customOrderItemRoutes

// Epilogue will automatically create standard RESTful routes
const order_items = epilogue.resource({
  model: db.model('order_items'),
  endpoints: ['/order_items', '/order_items/:id']
})

const {mustBeLoggedIn, selfOnly, forbidden} = epilogue.filters
order_items.delete.auth(mustBeLoggedIn)
order_items.delete.auth(selfOnly)
order_items.list.auth(forbidden("Verboten!"))
order_items.read.auth(mustBeLoggedIn)