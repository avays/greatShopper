'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')

const customAddressRoutes = require('express').Router() 

// customAddressRoutes.get("/", function(req, res, next){
// 	console.log("hello worold");
// 	res.send("Hello");
// })
// Custom routes go here.

module.exports = customAddressRoutes

// Epilogue will automatically create standard RESTful routes
const addresses = epilogue.resource({
  model: db.model('addresses'),
  endpoints: ['/addresses', '/addresses/:id']
})

const {mustBeLoggedIn, selfOnly, forbidden} = epilogue.filters
addresses.delete.auth(mustBeLoggedIn)
addresses.delete.auth(selfOnly)
addresses.list.auth(forbidden("Verboten!"))
addresses.read.auth(mustBeLoggedIn)