const userController = {};
const userRepository = require('./../Repositories/userRepostories');
const mailHelper = require('./../Helpers/mailHelper.js');
const stringHelper = require('./../Helpers/StringHelper.js');
const hashHelper = require('./../Helpers/HashHelper.js');

userController.login = async function (mail, pass) {
	const user = await userRepository.getUserByEmail(mail ,true );
	if ( user == undefined ) {
		return undefined
	}
	console.log(pass)
	console.log( user.pass )
	const isPasswordCorrect = await hashHelper.compareHashedStrings( pass , user.pass );
	console.log( isPasswordCorrect )
	if ( isPasswordCorrect === true ) {
		return user;
	} else {
		return undefined;
	}
};

userController.getUserByMail = async function( mail ){
	return await userRepository.getUserByMail(mail);
};

userController.getUserById = async function( userId ){
	return await userRepository.getUseByID( userId ); 
};

userController.createUser = async function( name , email , pass ){ 
	return await userRepository.createUser( name ,email , pass );
};

userController.createSession = function (user, request) {
	request.session.user = user;
	request.session.save();
};

/*
userController.invite = async function ( inviterUser , email) {
	const inviteCode = stringHelper.createRandomString(99);
	await mailHelper.sendInviteMail( email , inviteCode , inviterUser );
	return await userRepository.invite( inviterUser, email , inviteCode );
}; 

userController.requestInvite = async function( email , me , why ){

	(function sendMailToAdmin(){
		let mailBody = "Birisi davetiye istedi.";
		mailBody += "<br>" + email
		mailBody += "<br>" + me
		mailBody += "<br>" + why
		mailHelper.sendMail( 'emre.surk@gmail.com' , ' * * CMPub * * Davet talebi.', mailBody );
	})();

	(function sendMailToApplier(){
		let mailBody = "Merhaba!   ";		
		mailBody += "<br>Başvurutalebinizi aldık."
		mailBody += "<br>Genelde bir hafta içerisinde dönüş yapmış oluyoruz."
		mailBody += "<br>Bu süre zarfında biraz sabretmenizi rica ediyoruz."
		mailBody += "<br>Sevgiler."
		mailHelper.sendMail( email , 'CodeMastersPub Davetiye Talebinizi Aldık.', mailBody );
	})();

	return await userRepository.requestInvite( email , me , why );
}
*/
userController.updateBio = async function (userId, bio) {
	const updateObject = {
		bio : bio
	};
	return await userRepository.updateUser(userId , updateObject );
};

module.exports = userController;