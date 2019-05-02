const express = require('express');
const router = express.Router();

router.use('/', async function (req, res, next) {
	const url = req.originalUrl;
	
	console.log(" index of login  ", url.indexOf('/login'));
	
	if (url.indexOf('/login') == -1 &&
		url.indexOf('/register') == -1 &&
		url.indexOf('/lostpass') == -1 &&
		url.indexOf('/logout') == -1) {
		console.log(" updated last url :  ", url);
		req.session.lastUrl = url;
	}
	
	if (req.session.user !== undefined) {
		res.locals.user = req.session.user;
	}
	next();
});

module.exports = router;
