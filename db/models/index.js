'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Address = require("./address")
const Payment = require("./payment")
const Order = require("./order")
const Order_Item = require("./order_item")
const Review = require("./review")
const Product = require("./product")
const Category = require("./category")
const Media = require("./media")

Payment.belongsTo(User,  {
		allowNull: false
	});
Payment.belongsTo(Address, {
		as: "billingAddress",
		allowNull: false
	}
);
Address.belongsTo(User,  {
		as: "shippingAddress"
	});
Review.belongsTo(User,  {
		allowNull: false
	});
Order.belongsTo(User,  {
		allowNull: false
	});
Order.belongsTo(Address,  {
		allowNull: false
	});
Order.belongsTo(Payment,  {
		allowNull: false
	});
Order_Item.belongsTo(Order,  {
		allowNull: false
	});
Order.belongsTo(Order_Item,  {
		allowNull: false
	}); // for eager loading
Order_Item.belongsTo(Product,  {
		allowNull: false
	});
Review.belongsTo(Product,  {
		allowNull: false
	});
Product.hasMany(Review); // for eager loading
Category.belongsToMany(Product, {through: "CategoryProduct"});
Product.hasMany(Category, {
		allowNull: false
	});
Media.belongsToMany(Product, {
		through: "MediaProduct",
		allowNull: false
	});
Product.hasMany(Media);


module.exports = {User, Address, Payment, Order, Order_Item, Review, Product, Category, Media}