const express = require('express');
const router = express.Router();
const userController = require('./../sources/Controllers/userContoller.js');
const inviteController = require('./../sources/Controllers/inviteController.js')

router.get('/:userid' , async function(request,response) {
    
    const userId = request.params.userid;
    const user = await userController.getUserById(userId);

    console.log("prof page : " , user);
    
    response.render('profile.jade' , {
        profileUser : user
    });
});

router.post('/invite', async function (request, response, next) {

	console.log("invite : " , request.body )

	const invitedMail = request.body.email;
	await inviteController.invite( request.session.user , invitedMail );
	response.redirect('/user/' + request.session.user.iduser )
});

router.post('/requestinvite' , async function(request , response){
	// todo show message to user on frontend

	const email = request.body.email;
	const me = request.body.me;
	const why = request.body.why;

	await inviteController.requestInvite( email , me , why );

	const returnUrl =  (request.session.lastUrl || "/") + "?success=BasvuruAlindi." 
	console.log(returnUrl)
	response.redirect( returnUrl );
})

router.post('/', async function (request, response, next) {
	
	console.log(" update user : " , request.body);
	
	const bio = request.body.bio;
	await userController.updateBio(request.session.user.iduser , bio);
	response.redirect('/user/' + request.session.user.iduser);
});

module.exports = router ;