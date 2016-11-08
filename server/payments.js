'use strict'

require('APP/.env.js');
const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);
const Promise = require('bluebird');
const {mustBeAdmin, mustHavePermission, mustBeLoggedIn, selfOnly}  = require("./utils")

const paymentRoutes = require('express').Router() 


paymentRoutes.get("/:paymentid", function(req, res, next){
	
	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!selfOnly(req)){
		return res.status(403).send(`You do not have permission.`)
	}
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


paymentRoutes.post("/:token", function(req, res, next){
	// Kenty: waiting for Dillon to rewrite this function
	
// >>>>>>> 25b35c4fb080d10c32839958b4373ef3bad521ef
// 	if(!mustBeLoggedIn(req)){
// 		return res.status(401).send('You must be logged in.')
// 	}
// 	if(!selfOnly(req)){
// 		return res.status(403).send(`You do not have permission.`)
// 	}

// 	const paymentData = {
// 		amount: req.body.amount,
// 		currency: 'usd',
// 		source: req.body.token
// 	};

// 	stripe.charges.create(paymentData, (err, charge) => {
// 		if (err) {
// 			console.error('error from stripe', err)
// 			next(err);
// 		} else {
// 			console.log('got charge back and it is ', charge)
// 			res.json(charge);
// 		}
// 	});

});




module.exports = paymentRoutes;

		// shipping: req.body.shippingAddress,
		// email: req.body.email
