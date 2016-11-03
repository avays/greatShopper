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

const utils = {mustBeAdmin, mustHavePermission, mustBeLoggedIn, selfOnly}
module.exports = utils