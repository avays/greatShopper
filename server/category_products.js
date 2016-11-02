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

const {mustBeAdmin} = epilogue.filters;

category_products.delete.auth(mustBeAdmin);
category_products.create.auth(mustBeAdmin);
category_products.update.auth(mustBeAdmin);
