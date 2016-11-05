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

customProductRoutes.get("/search/:searchInput", function(req, res, next) {

	Product.findAll({
    where: {
      $or: [
        {name: {
          $ilike: `%${req.params.searchInput}%`
          }
        },
        {manufacturer: {
          $ilike: `%${req.params.searchInput}%`
          }
        },
        {location: {
          $ilike: `%${req.params.searchInput}%`
          }
        },
        {description: {
          $ilike: `%${req.params.searchInput}%`
          }
        }
        ]
    }
  })
		.then(products => res.json(products))
		.catch(next);
});

// name of product, manufacturer, location, word in description

customProductRoutes.get("/:sku", function(req, res, next) {

	// need to account for some edge cases:
	// 1. Product is discontinued (only admin can access)
	// 2. Product is hidden (only admin OR customer who accessed it previously can access)

	Product.findOne({
		where: {
			sku: req.params.sku
		},
		include: [Review]
	})
		.then(product => res.json(product))
		.catch(next)

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