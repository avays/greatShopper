const Sequelize = require('sequelize');
const db = require('APP/db');

const Product = db.define('products', {

	sku: {
		type: Sequelize.INTEGER,
		allowNull: false,
		unique: true,
		primaryKey: true,
		validate: {
			min: 1000000000,
			max: 9999999999
		}
	},

	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	},

	name: {
		type: Sequelize.STRING,
		allowNull: false
	},

	color: {
		type: Sequelize.STRING
	},

	price: {
		type: Sequelize.DECIMAL(10, 2),
		allowNull: false
	},

	size: {
		type: Sequelize.STRING
	},

	location: {
		type: Sequelize.STRING
	},

	manufacturer: {
		type: Sequelize.STRING
	},

	description: {
		type: Sequelize.TEXT
	},

	isVisible: {
		type: Sequelize.ENUM("discontinued", "hidden", "visible"),
		allowNull: false,
		defaultValue: "visible"
	}
}, {

	getterMethods: {
		mainImage: function() {
			// TODO: fetches first image in related media association OR default image
		}
	}

});

module.exports = Product;
