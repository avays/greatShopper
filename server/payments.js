'use strict'


const db = require('APP/db')

const customPaymentRoutes = require('express').Router() 

// customPaymentRoutes.get("/", function(req, res, next){
// 	console.log("hello worold");
// 	res.send("Hello");
// })
// Custom routes go here.

module.exports = customPaymentRoutes

// Epilogue will automatically create standard RESTful routes
const payments = epilogue.resource({
  model: db.model('payments'),
  endpoints: ['/payments', '/payments/:id']
})

const {mustBeLoggedIn, selfOnly, forbidden} = epilogue.filters
payments.delete.auth(mustBeLoggedIn)
payments.delete.auth(selfOnly)
payments.list.auth(forbidden("Verboten!"))
payments.read.auth(mustBeLoggedIn)