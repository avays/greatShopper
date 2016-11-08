'use strict'

const db = require('APP/db')
const {mustBeAdmin, mustHavePermission, mustBeLoggedIn, selfOnly}  = require("./utils")

const customUserRoutes = require('express').Router() 

const User = db.model("users");
const Address = db.model("addresses");

customUserRoutes.get("/", function(req, res, next){

	mustBeAdmin(req)
		.then(userAdmin => {
			userAdmin.data.isAdmin ? 
			 User.findAll({
			 	include: [{all: true}]
			 }): res.status(403).send('You do not have administrative privileges')
		})
		.then(users => res.json(users))
		.catch(next);
});

customUserRoutes.get("/checkAdmin/:id", function(req, res, next){

	 User.findOne({
	 	where: {
	 		id: req.params.id,
	 		isAdmin: true
	 	}
	 })
		.then(user => res.json(user))
		.catch(next);
});

customUserRoutes.get("/:id", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!selfOnly(req)){
		return res.status(403).send(`You do not have permission.`)
	}

	 User.findById(req.params.id, {	 	
	 	include: [{all: true}]
	 })
		.then(user => res.json(user))
		.catch(next);
});

customUserRoutes.put("/:id", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!selfOnly(req)){
		return res.status(403).send(`You do not have permission.`)
	}

	User.update(req.body, {where: {id: req.params.id}})
		.then(rowsModified => res.json(rowsModified))
		.catch(next);
});

customUserRoutes.post("/", function(req, res, next){

	User.create({ 
		email: req.body.email,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName, 
		isAdmin: false 
	}, { fields: [ 'email', 'password', 'password_digest','firstName', 'isAdmin', 'lastName' ] })
		.then(user => res.json(user))
		.catch(next);
});

customUserRoutes.delete("/:id", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!selfOnly(req)){
		return res.status(403).send(`You do not have permission.`)
	}
	
	User.destroy({where: {id: req.params.id}})
		.then(rowsModified => res.json(rowsModified))
		.catch(next);
});

module.exports = customUserRoutes;
