'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')

const customCategoryRoutes = require('express').Router() 

// customCategoryRoutes.get("/", function(req, res, next){
// 	console.log("hello worold");
// 	res.send("Hello");
// })
// Custom routes go here.

module.exports = customCategoryRoutes

// Epilogue will automatically create standard RESTful routes
const categories = epilogue.resource({
  model: db.model('categories'),
  endpoints: ['/categories', '/categories/:id']
})

const {mustBeLoggedIn, selfOnly, forbidden} = epilogue.filters
categories.delete.auth(mustBeLoggedIn)
categories.delete.auth(selfOnly)
categories.list.auth(forbidden("Verboten!"))
categories.read.auth(mustBeLoggedIn)