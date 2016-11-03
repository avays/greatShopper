'use strict'

const db = require('APP/db')
const {mustBeAdmin, mustHavePermission, mustBeLoggedIn, selfOnly}  = require("./utils")

const customUserRoutes = require('express').Router() 

const User = db.model("users");
const Payment = db.model("payments");
const Address = db.model("addresses");

customUserRoutes.get("/", function(req, res, next){

	if(!mustBeAdmin(req)){
		return res.status(403).send('You do not have administrative privileges')
	}
	 User.findAll({
	 	include: [{all: true}]
	 })
		.then(users => res.json(users))
		.catch(next);
});


customUserRoutes.get("/:id", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!mustHavePermission(req)){
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
	if(!mustHavePermission(req)){
		return res.status(403).send(`You do not have permission.`)
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
		return res.status(401).send('You must be logged in.')
	}
	if(!mustHavePermission(req)){
		return res.status(403).send(`You do not have permission.`)
	}
	User.destroy({where: {id: req.params.id}})
		.then(rowsModified => res.json(rowsModified))
		.catch(next);
});

module.exports = customUserRoutes;
