'use strict'

const db = require('APP/db')
const {mustBeAdmin, mustHavePermission, mustBeLoggedIn, selfOnly}  = require("./utils")

const customUserRoutes = require('express').Router() 

const User = db.model("users");
const Payment = db.model("payments");
const Address = db.model("addresses");

customUserRoutes.get("/", function(req, res, next){

	if(!mustBeAdmin(req)){
		res.status(403).send('You do not have administrative privileges')
	}
	 User.findAll({
	 	include: [{all: true}]
	 })
		.then(users => res.json(users))
		.catch(next);
});


customUserRoutes.get("/:id", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		res.status(401).send('You must be logged in.')
	}
	if(!mustHavePermission(req)){
		res.status(403).send(`You do not have permission.`)
	}

	 User.findById(req.params.id, {	 	
	 	include: [{all: true}]
	 })
		.then(user => res.json(user))
		.catch(next);
});

customUserRoutes.put("/:id", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		res.status(401).send('You must be logged in.')
	}
	if(!mustHavePermission(req)){
		res.status(403).send(`You do not have permission.`)
	}

	User.update(req.body, {where: {id: req.params.id}})
		.then(rowsModified => res.json(rowsModified))
		.catch(next);
});

customUserRoutes.post("/", function(req, res, next){

	User.findOrCreate({where: {
			email: req.body.email
		}
	})
		.spread((user, created) => {
			return created ? res.json(user) : res.status(300).send(user.email)
		}
	)
		.catch(next);
});

customUserRoutes.delete("/:id", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		res.status(401).send('You must be logged in.')
	}
	if(!mustHavePermission(req)){
		res.status(403).send(`You do not have permission.`)
	}
	User.destroy({where: {id: req.params.id}})
		.then(rowsModified => res.json(rowsModified))
		.catch(next);
});

// Custom routes go here.
module.exports = customUserRoutes;


// // Epilogue will automatically create standard RESTful routes
// const users = epilogue.resource({
//   model: db.model('users'),
//   endpoints: ['/users', '/users/:id']
// })


// const {mustBeAdmin, mustHavePermission, mustBeLoggedIn, selfOnly} = epilogue.filters
// users.delete.auth(mustBeLoggedIn)
// users.delete.auth(selfOnly("delete"))
// users.list.auth(mustBeAdmin)
// users.read.auth(mustBeLoggedIn)
// users.read.auth(selfOnly("get info on"))
// users.update.auth(mustBeLoggedIn)
// users.update.auth(mustHavePermission)

