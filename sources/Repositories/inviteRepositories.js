const db = require("./../Databases/MainDatabase");

let inviteRepositories = {}

inviteRepositories.invite = async function (inviterUser, email , inviteCode) {
	const inviteOjb = {
		invite_inviter_userid : inviterUser.iduser ,
		invite_invited_email : email,
		invite_code : inviteCode
	};
	return await db.runAsyncQuery("insert into invite set ? " , [ inviteOjb ]);
};

inviteRepositories.requestInvite = async function(email , me , why ){
	const inviteObj = {
		ir_email : email,
		ir_me : me,
		ir_why : why
	}
	return await db.runAsyncQuery("insert into invite_request set ? " , [ inviteObj ]);
}

inviteRepositories.getInvite = async function(inviteCode){
	return await db.selectOneAsync(" select * from invite where invite_code = ? " , [ inviteCode ]);
}

module.exports = inviteRepositories;