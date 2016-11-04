'use strict'

const db = require('APP/db')
const {mustBeAdmin, mustHavePermission, mustBeLoggedIn, selfOnly}  = require("./utils")

const customPaymentRoutes = require('express').Router() 

const User = db.model("users");
const Payment = db.model("payments");
const Address = db.model("addresses");

customPaymentRoutes.get("/:id", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!mustHavePermission(req)){
		return res.status(403).send(`You do not have permission.`)
	}

	User.findById(req.params.id, {	 	
	 	include: [{
	 		model: Payment
			}]
	 })
		.then(payments => res.json(payments))
		.catch(next);
});

customPaymentRoutes.get("/:id/:pid", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!mustHavePermission(req)){
		return res.status(403).send(`You do not have permission.`)
	}

	 Payment.findById(req.params.pid)
		.then(payment => res.json(payment))
		.catch(next);
});

customPaymentRoutes.put("/:id/:pid", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!mustHavePermission(req)){
		return res.status(403).send(`You do not have permission.`)
	}

	Payment.update(req.body, {where: {id: req.params.pid}})
		.then(rowsModified => res.json(rowsModified))
		.catch(next);
});

// customPaymentRoutes.post("/:id", function(req, res, next){
	
	// if(!mustBeLoggedIn(req)){
	// 	return res.status(401).send('You must be logged in.')
	// }
	// if(!mustHavePermission(req)){
	// 	return res.status(403).send(`You do not have permission.`)
	// }

	//// make this work... or use Swipe
	// Payment.findOrCreate({where: {
	// 		//number_digest: checkEncrypted(req.body.number),
	// 		cardType: req.body.cardType,
	// 		expirationDate: req.body.expirationDate
	// 	}
	// })
	// 	.spread((payment, created) => {
	// 		return created ? res.json(payment) : res.status(300).send(payment.email)
	// 	}
	// )
	// 	.catch(next);
// });


customPaymentRoutes.delete("/:id/:pid", function(req, res, next){

	if(!mustBeLoggedIn(req)){
		return res.status(401).send('You must be logged in.')
	}
	if(!mustHavePermission(req)){
		return res.status(403).send(`You do not have permission.`)
	}
	Payment.destroy({where: {id: req.params.pid}})
		.then(rowsModified => res.json(rowsModified))
		.catch(next);
});

module.exports = customPaymentRoutes;
