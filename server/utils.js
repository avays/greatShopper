const axios  = require('axios')

// mustBeAdmin works differently, doesn't return a bool but rather a promise
const mustBeAdmin = (req) => {
	const address = req.protocol + "://" + req.get('host') + "/";

	return axios.get(`${address}api/users/checkAdmin/${req.session.passport.user}`)
}

// mustHavePermission NOT working since mustBeAdmin change
const mustHavePermission = (req) => {
  return false;
}

const mustBeLoggedIn = (req) => {
  return req.session.passport && req.session.passport.user;
}

const selfOnly = (req) => {
 return req.session.passport && (req.params.id === req.session.passport.user) 
}

const formatDate = () => {
	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();

	return year + "-" + month + "-" + day;

}

const utils = {mustBeAdmin, mustHavePermission, mustBeLoggedIn, selfOnly, formatDate}
module.exports = utils