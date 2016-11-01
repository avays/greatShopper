const Sequelize = require('sequelize');
const db = require('APP/db');

const Media = db.define('media', {
	
	type: {
		type: Sequelize.STRING,
		allowNull: false
	},

	url: {
		type: Sequelize.STRING,
		allowNull: false
	}

});

module.exports = Media;
