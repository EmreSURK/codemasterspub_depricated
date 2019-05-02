const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
	const lastURL = req.session.lastUrl || "/";
	req.session.destroy();
	res.redirect(lastURL);
});


module.exports = router ;