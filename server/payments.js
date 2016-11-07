'use strict'

require('APP/.env.js');
const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);
const Promise = require('bluebird');
const {mustBeAdmin, mustHavePermission, mustBeLoggedIn, selfOnly}  = require("./utils")

const customPaymentRoutes = require('express').Router() 


customPaymentRoutes.get("/:paymentid", function(req, res, next){
	/*
	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!mustHavePermission(req)){
		return res.status(403).send(`You do not have permission.`)
	}
	*/

		stripe.charges.retrieve(req.params.paymentid, (err, charge) => {
			if (err) {
				next(err);
			} else {
				const publicData = {
					brand: charge.source.brand,
					last4: charge.source.last4,
					exp_month: charge.source.exp_month,
					exp_year: charge.source.exp_year
				}
				res.json(publicData);
			}
		});
});


// customPaymentRoutes.put("/:id/:pid", function(req, res, next){

// 	if(!mustBeLoggedIn(req)){
// 		return res.status(401).send('You must be logged in.')
// 	}
// 	if(!mustHavePermission(req)){
// 		return res.status(403).send(`You do not have permission.`)
// 	}

// 	Payment.update(req.body, {where: {id: req.params.pid}})
// 		.then(rowsModified => res.json(rowsModified))
// 		.catch(next);
// });




// customPaymentRoutes.delete("/:id/:pid", function(req, res, next){

// 	if(!mustBeLoggedIn(req)){
// 		return res.status(401).send('You must be logged in.')
// 	}
// 	if(!mustHavePermission(req)){
// 		return res.status(403).send(`You do not have permission.`)
// 	}
// 	Payment.destroy({where: {id: req.params.pid}})
// 		.then(rowsModified => res.json(rowsModified))
// 		.catch(next);
// });

module.exports = customPaymentRoutes;
