'use strict'

require('APP/.env.js');
const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);
const db = require('APP/db')

const Order = db.model("orders");
const Order_Item = db.model("order_items");
const Address = db.model("addresses");
const { formatDate }  = require("./utils")

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

	const createStripePromise = paymentData => {
		return new Promise((resolve, reject) => {
			stripe.charges.create(paymentData, (err, charge) => {
				if (err) {
					reject(err);
				} else {
					resolve(charge);
				}
			});
		});
	};

	const orderDataForStripe = req.body.orderDataForStripe;
	const orderDataFromStore = req.body.orderDataFromStore;


	createStripePromise(orderDataForStripe)
		.then(charge => {
			if (charge.id) {
				Address.findOrCreate({ 
					where: {
						name: orderDataFromStore.shippingAddress.name,
						street1: orderDataFromStore.shippingAddress.stret1,
						street2: orderDataFromStore.shippingAddress.street2,
						city: orderDataFromStore.shippingAddress.city,
						state: orderDataFromStore.shippingAddress.state,
						zip: orderDataFromStore.shippingAddress.zip,
						email: orderDataFromStore.shippingAddress.email,
						user_id: orderDataFromStore.user_id
					} 
				})
					.then(address => {
						return address
					})
					.then(address => {
						const newOrder = {
							status: 'pending',
							submitDate: formatDate(),
							user_id: orderDataFromStore.user_id,
							address_id: address.id,
							payment_id: charge.id							
						}

						return Order.create(newOrder)
					})
						.then(order => {
							const withON = orderDataFromStore.order_items.map(item => {
								return Object.assign({}, item, { order_orderNumber: order.orderNumber, status: 'pending' })
							});
							return Order_Item.bulkCreate(withON)
					})
						.then(order_items => {
						})
						.catch(next)
					}
				res.json(charge)
			}) 
		.catch(err => {
			res.json(err)
		})
});

module.exports = paymentRoutes;


