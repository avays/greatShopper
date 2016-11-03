'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')

const customMediaRoutes = require('express').Router() 

// customMediaRoutes.get("/", function(req, res, next){
// 	console.log("hello worold");
// 	res.send("Hello");
// })
// Custom routes go here.

module.exports = customMediaRoutes

// Epilogue will automatically create standard RESTful routes
const media = epilogue.resource({
  model: db.model('media'),
  endpoints: ['/media', '/media/:id']
})

const {mustBeLoggedIn, selfOnly, forbidden} = epilogue.filters
media.delete.auth(mustBeLoggedIn)
media.delete.auth(selfOnly)
media.list.auth(forbidden("Verboten!"))
media.read.auth(mustBeLoggedIn)