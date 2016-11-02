'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')

const customCategoryProductRoutes = require('express').Router() 

// customCategoryProductRoutes.get("/", function(req, res, next){
// 	console.log("hello worold");
// 	res.send("Hello");
// })
// Custom routes go here.

module.exports = customCategoryProductRoutes

// Epilogue will automatically create standard RESTful routes
const category_products = epilogue.resource({
  model: db.model('category_products'),
  endpoints: ['/category_products', '/category_products/:id']
})

const {mustBeLoggedIn, selfOnly, forbidden} = epilogue.filters
category_products.delete.auth(mustBeLoggedIn)
category_products.delete.auth(selfOnly)
category_products.list.auth(forbidden("Verboten!"))
category_products.read.auth(mustBeLoggedIn)