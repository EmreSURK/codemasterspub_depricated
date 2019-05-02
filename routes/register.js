const express = require('express');
const router = express.Router();
const userController = require('./../sources/Controllers/userContoller');
const inviteController = require('./../sources/Controllers/inviteController');
const hashHelper = require('./../sources/Helpers/HashHelper');

router.get('/join/:invitecode' , async function(request , response){

	const _inviteCode = request.params.invitecode;
	const invite = await inviteController.getInvite(_inviteCode);

	if ( invite == undefined ) {
		response.redirect('/'); // todo - add error message.
		return;
	}

	response.render('join',{
		email : invite.invite_invited_email,
		invitecode : _inviteCode
	})
});

router.post('/join/', async function (request, response, next) {
	
	console.log(" reg join" , request.body);
	
	const inviteCode = request.body.invitecode;
	const email = request.body.email;
	const name = request.body.name;
	const pass = await hashHelper.hashString(request.body.password);
	//const pass2 = request.body.passwordagain; // todo check if they are same.
	
	console.log(" code : " , inviteCode );
	
	const invite = await inviteController.getInvite(inviteCode);
	
	console.log(" invite : " , invite );
	
	if ( invite == undefined ){
		
		response.redirect('/'); // todo add error message.
		return;
	}
	
	if( invite.invite_invited_email != email ) {
		
		response.redirect('/'); // todo add error message.
		return;
	}
	
	const createdUser = await userController.createUser( name , email , pass );
	userController.createSession(createdUser , request);
	
	response.redirect('/');
});


module.exports = router ;