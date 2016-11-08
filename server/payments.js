'use strict'

require('APP/.env.js');
const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);


const {mustBeAdmin, mustHavePermission, mustBeLoggedIn, selfOnly}  = require("./utils")

const paymentRoutes = require('express').Router() 


paymentRoutes.get("/:paymentid", function(req, res, next){
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


paymentRoutes.post("/:token", function(req, res, next){
	/*
	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!mustHavePermission(req)){
		return res.status(403).send(`You do not have permission.`)
	}
	*/

	const paymentData = {
		amount: req.body.amount,
		currency: 'usd',
		source: req.body.token,
		receipt_email: req.body.email
	};

	stripe.charges.create(paymentData, (err, charge) => {
		if (err) {
			res.json(err)
		} else {
			res.json(charge);
		}
	});

});




module.exports = paymentRoutes;

