'use strict'

const db = require('APP/db')
const {mustBeAdmin, mustHavePermission, mustBeLoggedIn, selfOnly, formatDate}  = require("./utils")

const customOrderRoutes = require('express').Router() 

const User = db.model("users");
const Order = db.model("orders");
const Order_Item = db.model("order_items");
const Address = db.model("addresses");
const Payment = db.model("payments");

customOrderRoutes.get("/:id", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!mustHavePermission(req)){
		return res.status(403).send(`You do not have permission.`)
	}

	Order.findAll({	 	
	 	include: [
	 		{model: User,
		 		where: {
						id: req.params.id
					}
			},
			{model: Address},
			{model: Order_Item},
			{model: Payment}
			]
	 })
		.then(orders => res.json(orders))
		.catch(next);
});

customOrderRoutes.post("/", function(req, res, next){
	// how do we prevent people from ordering using this route directly?
	Order.create({
		status: 'pending',
		submitDate: formatDate(),
		user_id: req.body.id,
		address_id: req.body.address_id,
		payment_id: req.body.payment_id
	})
		.then(order => res.json(order))
		.catch(next);
});

// Don't delete orders, just change their status
// customOrderRoutes.delete("/:id/:pid", function(req, res, next){

// 	if(!mustBeLoggedIn(req)){
// 		return res.status(401).send('You must be logged in.')
// 	}
// 	if(!mustHavePermission(req)){
// 		return res.status(403).send(`You do not have permission.`)
// 	}
// 	Order.destroy({where: {id: req.params.pid}})
// 		.then(rowsModified => res.json(rowsModified))
// 		.catch(next);
// });

module.exports = customOrderRoutes;
