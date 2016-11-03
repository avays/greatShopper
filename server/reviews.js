'use strict'

const db = require('APP/db')
const {mustBeAdmin, mustHavePermission, mustBeLoggedIn, selfOnly, formatDate}  = require("./utils")

const customReviewRoutes = require('express').Router() 

const Review = db.model("reviews");
const User = db.model("users");
const Product = db.model("products");

customReviewRoutes.get("/:sku", function(req, res, next){

	 Review.findAll({
	 	where: {product_sku: req.params.sku},
	 	include: [{model: User, attributes: ['firstName', 'lastName']}]
	 })
		.then(reviews => res.json(reviews))
		.catch(next);
});

customReviewRoutes.get("/:sku/:rid", function(req, res, next){

	 Review.findById(req.params.id, {	 	
	 	include: [{model: User, attributes: ['firstName', 'lastName']}]
	 })
		.then(review => res.json(review))
		.catch(next);
});

customReviewRoutes.put("/:id/:rid", function(req, res, next){
	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!mustHavePermission(req)){
		return res.status(403).send(`You do not have permission.`)
	}

	Review.update(req.body, {where: {id: req.params.rid}})
		.then(rowsModified => res.json(rowsModified))
		.catch(next);
});

customReviewRoutes.post("/:id/:sku", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!mustHavePermission(req)){
		return res.status(403).send(`You do not have permission.`)
	}

	Review.findOrCreate({where: {
			text: req.body.text,
			stars: req.body.stars,
			date: formatDate(),
			user_id: req.params.id,
			product_sku: req.params.sku
		}
	})
		.spread((review, created) => {
			return created ? res.json(review) : res.status(300).send("Review already exists.")
		}
	)
		.catch(next);
});

customReviewRoutes.delete("/:id/:rid", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!mustHavePermission(req)){
		return res.status(403).send(`You do not have permission.`)
	}

	Review.destroy({where: {id: req.params.rid}})
		.then(rowsModified => res.json(rowsModified))
		.catch(next);
});

module.exports = customReviewRoutes;

