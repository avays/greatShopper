'use strict'

const db = require('APP/db')
const {mustBeAdmin, mustHavePermission, mustBeLoggedIn, selfOnly}  = require("./utils")

const customAddressRoutes = require('express').Router() 

const User = db.model("users");
const Address = db.model("addresses");

customAddressRoutes.get("/:id", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!selfOnly(req)){
		return res.status(403).send(`You do not have permission.`)
	}

	 Address.findAll({	 	
	 	include: [{
	 		model: User,
	 		where: {id: req.params.id},
	 		attributes: ['firstName', 'lastName']}]
	 })
	 	.then(addresses => res.json(addresses))
		.catch(next);
});

customAddressRoutes.get("/:id/:aid", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!selfOnly(req)){
		return res.status(403).send(`You do not have permission.`)
	}

	 Address.findById(req.params.aid, {	 	
	 	include: [{
	 		model: User,
	 		where: {id: req.params.id},
	 		attributes: ['firstName', 'lastName']}]
	 })
	 	.then(address => res.json(address))
		.catch(next);
});

customAddressRoutes.put("/:id/:aid", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!selfOnly(req)){
		return res.status(403).send(`You do not have permission.`)
	}

	Address.update(req.body, {where: {id: req.params.aid}})
		.then(rowsModified => res.json(rowsModified))
		.catch(next);
});

customAddressRoutes.post("/:id", function(req, res, next){



	Address.findOrCreate(req.body)

	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!selfOnly(req)){
		return res.status(403).send(`You do not have permission.`)
	}

	Address.findOrCreate({where: {
			alias: req.body.alias
		}
	})
		.spread((address, created) => {
			return created ? res.json(address) : res.status(300).send(address)
		}
	)
		.catch(next);
});

customAddressRoutes.delete("/:id/:aid", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!selfOnly(req)){
		return res.status(403).send(`You do not have permission.`)
	}
	Address.destroy({where: {id: req.params.aid}})
		.then(rowsModified => res.json(rowsModified))
		.catch(next);
});

module.exports = customAddressRoutes;
