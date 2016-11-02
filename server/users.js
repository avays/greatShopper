'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')

const customUserRoutes = require('express').Router() 

customUserRoutes.get("/", function(req, res, next){
	console.log("hello worold");
	res.send("Hello");
});
// Custom routes go here.


// Epilogue will automatically create standard RESTful routes
const users = epilogue.resource({
  model: db.model('users'),
  endpoints: ['/users', '/users/:id']
})


const {mustBeAdmin, mustHavePermission, mustBeLoggedIn, selfOnly} = epilogue.filters
users.delete.auth(mustBeLoggedIn)
users.delete.auth(selfOnly("delete"))
users.list.auth(mustBeAdmin)
users.read.auth(mustBeLoggedIn)
users.read.auth(selfOnly("get info on"))
users.update.auth(mustBeLoggedIn)
users.update.auth(mustHavePermission)

module.exports = customUserRoutes;
