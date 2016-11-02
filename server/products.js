'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')

const customProductRoutes = require('express').Router() 

// customProductRoutes.get("/", function(req, res, next){
// 	console.log("hello worold");
// 	res.send("Hello");
// })
// Custom routes go here.

module.exports = customProductRoutes

// Epilogue will automatically create standard RESTful routes
const products = epilogue.resource({
  model: db.model('products'),
  endpoints: ['/products', '/products/:id']
})

const {mustBeLoggedIn, selfOnly, forbidden} = epilogue.filters
products.delete.auth(forbidden("No one removes anything from here"))

products.read.auth() // is there scenario where user needs to see full contents of single product?