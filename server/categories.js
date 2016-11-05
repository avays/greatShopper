'use strict'

const db = require('APP/db')
const {
	mustBeAdmin,
	mustHavePermission,
	mustBeLoggedIn,
	selfOnly,
	formatDate
} = require("./utils")

const customCategoryRoutes = require('express').Router()

const Category = db.model("categories");
const User = db.model("users");
const Product = db.model("products");

customCategoryRoutes.get("/", function(req, res, next) {

	Category.findAll()
		.then(categories => res.json(categories))
		.catch(next);
});

customCategoryRoutes.get("/:name", function(req, res, next) {
	// only return hidden products if admin
	if (!mustBeAdmin(req)) {
		Category.findAll({
				where: {
					name: req.params.name
				},
				include: [{
					model: Product,
					where: {
						isVisible: {
							$not: "hidden"
						}
					}
				}]
			})
			.then(category => res.json(category))
			.catch(next);
	}
	else{
		Category.findAll({
				where: {
					name: req.params.name
				},
				include: [{
					model: Product
				}]
			})
			.then(category => res.json(category))
			.catch(next);
	}
});

customCategoryRoutes.get("/:name/:sku", function(req, res, next) {
	// only return hidden products if admin
	if (!mustBeAdmin(req)) {
		Category.findAll({
				where: {
					name: req.params.name
				},
				include: [{
					model: Product,
					where: {
						sku: req.params.sku,
						isVisible: {
							$not: "hidden"
						}
					}
				}]
			})
			.then(category => res.json(category))
			.catch(next);
	}
	else{
		Category.findAll({
				where: {
					name: req.params.name
				},
				include: [{
					model: Product,
					where: {
						sku: req.params.sku
					}
				}]
			})
			.then(category => res.json(category))
			.catch(next);
	}
});

customCategoryRoutes.get("/meta/:name", function(req, res, next) {
		Category.findAll({
				where: {
          meta_category_id: req.body.id
				}
			})
			.then(category => res.json(category))
			.catch(next);
});

customCategoryRoutes.put("/:name", function(req, res, next) {

	if (!mustBeAdmin(req)) {
		return res.status(403).send('You do not have administrative privileges')
	}

	Category.update(req.body, {
			where: {
				name: req.params.name
			}
		})
		.then(rowsModified => res.json(rowsModified))
		.catch(next);
});

customCategoryRoutes.post("/", function(req, res, next) {

	if (!mustBeAdmin(req)) {
		return res.status(403).send('You do not have administrative privileges')
	}

	Category.findOrCreate({
			where: {
				name: req.body.name
			}
		})
		.spread((category, created) => {
			return created ? res.json(category) : res.status(300).send("Category already exists.")
		})
		.catch(next);
});

customCategoryRoutes.delete("/:name", function(req, res, next) {

	if (!mustBeAdmin(req)) {
		return res.status(403).send('You do not have administrative privileges')
	}

	Category.destroy({
			where: {
				name: req.params.name
			}
		})
		.then(rowsModified => res.json(rowsModified))
		.catch(next);
});

module.exports = customCategoryRoutes;