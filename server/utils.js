const mustBeAdmin = (req) => {
	// admin probably needs to be redone
	return req.session.passport && req.session.passport.user && req.session.passport.user.isAdmin;
}

const mustHavePermission = (req) => {
	// admin probably needs to be redone
  return (req.session.passport && req.session.passport.user  && req.session.passport.user.isAdmin) || (req.session.passport && (req.params.id === req.session.passport.user)) 
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