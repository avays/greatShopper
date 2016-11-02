'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')

const customReviewRoutes = require('express').Router() 

// customReviewRoutes.get("/", function(req, res, next){
// 	console.log("hello worold");
// 	res.send("Hello");
// })
// Custom routes go here.

module.exports = customReviewRoutes

// Epilogue will automatically create standard RESTful routes
const reviews = epilogue.resource({
  model: db.model('reviews'),
  endpoints: ['/reviews', '/reviews/:id']
})

const {mustBeLoggedIn, selfOnly, forbidden} = epilogue.filters
reviews.delete.auth(mustBeLoggedIn)
reviews.delete.auth(selfOnly)
reviews.list.auth(forbidden("Verboten!"))
reviews.read.auth(mustBeLoggedIn)