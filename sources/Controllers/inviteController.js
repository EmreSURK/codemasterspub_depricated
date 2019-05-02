const stringHelper = require('./../Helpers/StringHelper.js');
const mailHelper = require('./../Helpers/mailHelper.js');
const inviteRepository = require('./../Repositories/inviteRepositories.js');

let inviteController = {}

inviteController.invite = async function ( inviterUser , email) {
	const inviteCode = stringHelper.createRandomString(99);
	await mailHelper.sendInviteMail( email , inviteCode , inviterUser );
	return await inviteRepository.invite( inviterUser, email , inviteCode );
}; 

inviteController.requestInvite = async function( email , me , why ){

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

	return await inviteRepository.requestInvite( email , me , why );
}

inviteController.getInvite = async function(inviteCode){
	return await inviteRepository.getInvite(inviteCode);
}

module.exports = inviteController;