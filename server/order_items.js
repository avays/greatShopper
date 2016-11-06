'use strict'

const db = require('APP/db')
const {mustBeAdmin, mustHavePermission, mustBeLoggedIn, selfOnly, formatDate}  = require("./utils")

const customOrderItemRoutes = require('express').Router() 

const User = db.model("users");
const Order = db.model("orders");
const Order_Item = db.model("order_items");
const Address = db.model("addresses");
const Payment = db.model("payments");

customOrderItemRoutes.get("/:oiid", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!mustHavePermission(req)){
		return res.status(403).send(`You do not have permission.`)
	}

	Order_Item.findById(req.params.oiid,{	 	
	 	include: [
	 		{all: true}
			]
	 })
		.then(item => res.json(item))
		.catch(next);
});

customOrderItemRoutes.post("/", function(req, res, next){
	// how do we prevent people from ordering using this route directly?
	Order_Item.create({
		status: 'pending',
		quantity: req.body.quantity,
		priceAtPurchase: req.body.priceAtPurchase,
		shippingDate: req.body.shippingDate,
		receiveDate: req.body.receiveDate,
		taxCost: req.body.taxCost,
		shippingCost: req.body.shippingCost,
		itemCost: req.body.itemCost,
		order_orderNumber: req.body.oid,
		product_sku: req.body.product_sku
	})
		.then(order => res.json(order))
		.catch(next);
});

// Don't delete orders_items, just change their status
// customOrderItemRoutes.delete("/:id/:pid", function(req, res, next){

// 	if(!mustBeLoggedIn(req)){
// 		return res.status(401).send('You must be logged in.')
// 	}
// 	if(!mustHavePermission(req)){
// 		return res.status(403).send(`You do not have permission.`)
// 	}
// 	OrderItem.destroy({where: {id: req.params.pid}})
// 		.then(rowsModified => res.json(rowsModified))
// 		.catch(next);
// });

module.exports = customOrderItemRoutes;
