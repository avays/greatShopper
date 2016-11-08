'use strict'

const db = require('APP/db')
const {mustBeAdmin, mustHavePermission, mustBeLoggedIn, selfOnly, formatDate}  = require("./utils")

const customOrderRoutes = require('express').Router() 

const User = db.model("users");
const Order = db.model("orders");
const Order_Item = db.model("order_items");
const Address = db.model("addresses");
const Product = db.model("products");

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const wellknown = require('nodemailer-wellknown');

const axios  = require('axios')
require('APP/.env.js')

const transport = nodemailer.createTransport({
    service: 'AOL',
    auth: {
        user: process.env.EMAIL_USERNAME, 
        pass: process.env.EMAIL_PASSWORD
    }
});



customOrderRoutes.get("/:ordernum", function(req, res, next) {

	Order.findOne({
		where: {
			orderNumber: req.params.ordernum
		},
		include: [
			{model: User},
			{model: Address},
			{model: Order_Item, include: [{model: Product}]}
		]
	})
		.then(orders => {
			res.json(orders)
		})
		.catch(next)
});

customOrderRoutes.get("/user/:userid", function(req, res, next){

	// if(!mustBeLoggedIn(req)){
	// 	return res.status(401).send('You must be logged in.')
	// }
	// if(!mustHavePermission(req)){
	// 	return res.status(403).send(`You do not have permission.`)
	// }

	Order.findAll({	 	
	 	include: [
	 		{model: User,
		 		where: {
						id: req.params.userid
					}
			},
			{model: Address},
			{model: Order_Item/*,
				include: [{all:true}]*/},
			]
	 })
		.then(orders => res.json(orders))
		.catch(next);
});

customOrderRoutes.post("/", function(req, res, next){
	const address = req.protocol + "://" + req.get('host') + "/";

	// how do we prevent people from ordering using this route directly?
	Order.create({
		status: 'pending',
		submitDate: formatDate(),
		user_id: req.body.user_id,
		address_id: req.body.address_id,
		payment_id: req.body.payment_id
	})
		.then(order => {
			axios.get(`${address}api/orders/${order.orderNumber}`)
				.then(order => {

			          var mailOptions = {
			              from: '"Great Shopper" <great.shopper@aol.com>', // sender address
			              to: order.data.user.email, // list of receivers
			              subject: 'Your order has been placed', // Subject line
			              text: 'Your order has been placed! Thanks for shopping at Great Shopper.\n\n\nGreat Shopper Team'
			          };
			          transport.sendMail(mailOptions, function(error, info){
			              if(error){
			                  return console.log(error);
			              }
			              console.log('Message sent: ' + info.response);
			        });
			      })
			return res.json(order)
		})
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
