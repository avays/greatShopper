'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')

const customMediaProductRoutes = require('express').Router() 

// customMediaProductRoutes.get("/", function(req, res, next){
// 	console.log("hello worold");
// 	res.send("Hello");
// })
// Custom routes go here.

module.exports = customMediaProductRoutes

// Epilogue will automatically create standard RESTful routes
const media_products = epilogue.resource({
  model: db.model('media_products'),
  endpoints: ['/media_products', '/media_products/:id']
})

const {mustBeLoggedIn, selfOnly, forbidden} = epilogue.filters
media_products.delete.auth(mustBeLoggedIn)
media_products.delete.auth(selfOnly)
media_products.list.auth(forbidden("Verboten!"))
media_products.read.auth(mustBeLoggedIn)