'use strict'

const db = require('APP/db')
const {
	mustBeAdmin,
	mustHavePermission,
	mustBeLoggedIn,
	selfOnly,
	formatDate
} = require("./utils")

const customProductRoutes = require('express').Router()

const Category = db.model("categories");
const User = db.model("users");
const Product = db.model("products");
const Review = db.model("reviews");

customProductRoutes.get("/", function(req, res, next) {

	Product.findAll()
		.then(products => res.json(products))
		.catch(next);
});

customProductRoutes.get("/:sku", function(req, res, next) {
	// only return hidden product if admin
	if (!mustBeAdmin(req)) {
		Product.findAll({
			where: {
				sku: req.params.sku,
				isVisible: {
						$not: "hidden"
					}
			},
			include: [{
				model: Review
			}]
		})
		.then(product => res.json(product))
		.catch(next);
	}
	else{
		Product.findAll({
			where: {
				sku: req.params.sku
			},
			include: [{
				model: Review
			}]
		})
		.then(product => res.json(product))
		.catch(next);
	}
});

customProductRoutes.put("/:sku", function(req, res, next) {

	if (!mustBeAdmin(req)) {
		return res.status(403).send('You do not have administrative privileges')
	}

	Product.update(req.body, {
			where: {
				sku: req.params.sku
			}
		})
		.then(rowsModified => res.json(rowsModified))
		.catch(next);
});

customProductRoutes.post("/", function(req, res, next) {

	if (!mustBeAdmin(req)) {
		return res.status(403).send('You do not have administrative privileges')
	}

	Product.findOrCreate({
			where: req.body
			
		})
		.spread((product, created) => {
			return created ? res.json(product) : res.status(300).send("Product SKU already exists.")
		})
		.catch(next);
});

customProductRoutes.delete("/:sku", function(req, res, next) {

	if (!mustBeAdmin(req)) {
		return res.status(403).send('You do not have administrative privileges')
	}

	Product.destroy({
			where: {
				sku: req.params.sku
			}
		})
		.then(rowsModified => res.json(rowsModified))
		.catch(next);
});

module.exports = customProductRoutes;