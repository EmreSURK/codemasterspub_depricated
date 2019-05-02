const express = require('express');
const router = express.Router();
const userController = require('./../sources/Controllers/userContoller');
const hashHelper = require('./../sources/Helpers/HashHelper');

router.post('/', async function (req, res ) {
	
	const returnURL = "depricated.";  //encodeURIComponent(req.body.returnurl);
	
	const email = req.body.email;
	const pass = req.body.password;
		
	const user = await userController.login( email , pass);
		
	if ( user == undefined ) {
		res.render(
			'login.jade',
			{ returnurl : returnURL , error : "Girilen bilgiler hatalı." }
		);
		return
	} else {
		userController.createSession(user , req );
		console.log("* * * login: " + user.iduser + "  " + user.nick);
	}
	
	res.redirect(req.session.lastUrl || "/" );

});
router.get('/', async function (req, res, next) {
	const returnURL = req.query.returnurl;
	res.render(
		'login.jade',
		{returnurl : returnURL }
	)
});


router.get('/register', async function (req, res, next) {
	const returnURL = encodeURIComponent(req.body.returnurl);
	res.render(
		'register.jade',
		{returnurl : returnURL }
	)
});

router.get('/lostpass' , async function(request , response){
	// todo
	response.render('error', {
		message : "Keşke unutmasaydın, bu kısmı henüz yapmadık. Bir ara tamamalayacağız.Bu arada CMPub 'u gelişimine sen de destek olablirsin Github ile."
	})
})

module.exports = router ;