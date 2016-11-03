'use strict'

const db = require('APP/db')
const {mustBeAdmin, mustHavePermission, mustBeLoggedIn, selfOnly}  = require("./utils")

const customReviewRoutes = require('express').Router() 

const Review = db.model("reviews");
const User = db.model("users");
const Product = db.model("products");

customReviewRoutes.get("/:sku", function(req, res, next){

	 Review.findAll({
	 	where: {product_sku: req.params.sku},
	 	include: [{model: User}],
	 	attributes: ['firstName']
	 })
		.then(reviews => res.json(reviews))
		.catch(next);
});


customReviewRoutes.get("/:id", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		res.status(401).send('You must be logged in.')
	}
	if(!mustHavePermission(req)){
		res.status(403).send(`You do not have permission.`)
	}

	 Review.findById(req.params.id, {	 	
	 	include: [{all: true}]
	 })
		.then(review => res.json(review))
		.catch(next);
});

customReviewRoutes.put("/:id", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		res.status(401).send('You must be logged in.')
	}
	if(!mustHavePermission(req)){
		res.status(403).send(`You do not have permission.`)
	}

	Review.update(req.body, {where: {id: req.params.id}})
		.then(rowsModified => res.json(rowsModified))
		.catch(next);
});

customReviewRoutes.post("/", function(req, res, next){

	Review.findOrCreate({where: {
			email: req.body.email
		}
	})
		.spread((review, created) => {
			return created ? res.json(review) : res.status(300).send(review.email)
		}
	)
		.catch(next);
});

customReviewRoutes.delete("/:id", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		res.status(401).send('You must be logged in.')
	}
	if(!mustHavePermission(req)){
		res.status(403).send(`You do not have permission.`)
	}
	Review.destroy({where: {id: req.params.id}})
		.then(rowsModified => res.json(rowsModified))
		.catch(next);
});

// Custom routes go here.
module.exports = customReviewRoutes;


// // Epilogue will automatically create standard RESTful routes
// const reviews = epilogue.resource({
//   model: db.model('reviews'),
//   endpoints: ['/reviews', '/reviews/:id']
// })


// const {mustBeAdmin, mustHavePermission, mustBeLoggedIn, selfOnly} = epilogue.filters
// reviews.delete.auth(mustBeLoggedIn)
// reviews.delete.auth(selfOnly("delete"))
// reviews.list.auth(mustBeAdmin)
// reviews.read.auth(mustBeLoggedIn)
// reviews.read.auth(selfOnly("get info on"))
// reviews.update.auth(mustBeLoggedIn)
// reviews.update.auth(mustHavePermission)

