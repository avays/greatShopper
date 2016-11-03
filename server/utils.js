const mustBeAdmin = (req) => {
	console.log("test")
	return req.user && req.user.isAdmin;
}

const mustHavePermission = (req) => {
  return (req.user && req.user.isAdmin) || (req.params.id === (req.user && req.user.id))
}

const mustBeLoggedIn = (req) => {
  return req.user
}

const selfOnly = (req) => {
 return (req.params.id === (req.user && req.user.id)) 
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