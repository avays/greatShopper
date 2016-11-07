'use strict'

const db = require('APP/db')
const {
	mustBeAdmin,
	mustHavePermission,
	mustBeLoggedIn,
	selfOnly,
	formatDate
} = require("./utils")

const customCategoryProductsRoutes = require('express').Router()

const CategoryProduct = db.model("CategoryProduct");
const Category = db.model("categories");
const User = db.model("users");
const Product = db.model("products");

customCategoryProductsRoutes.post("/", function(req, res, next) {

	// if (!mustBeAdmin(req)) {
	// 	return res.status(403).send('You do not have administrative privileges')
	// }

	CategoryProduct.create({
				category_id: req.body.id,
				product_sku: req.body.sku
		})
		.then(categoryproduct => res.json(categoryproduct))
		.catch(next);
});

module.exports = customCategoryProductsRoutes;