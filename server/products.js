'use strict'

const db = require('APP/db')

const customProductRoutes = require('express').Router() 

// customProductRoutes.get("/", function(req, res, next){
// 	console.log("hello worold");
// 	res.send("Hello");
// })
// Custom routes go here.

/*

	NOTE: need to write custom routes for read and list
		- Do not show non-Admin users quantity

*/

module.exports = customProductRoutes

// Epilogue will automatically create standard RESTful routes
const products = epilogue.resource({
  model: db.model('products'),
  endpoints: ['/products', '/products/:id']
});

const {mustBeAdmin, forbidden} = epilogue.filters;

products.delete.auth(forbidden("No one removes anything from here"));
products.create.auth(mustBeAdmin);
products.update.auth(mustBeAdmin);
