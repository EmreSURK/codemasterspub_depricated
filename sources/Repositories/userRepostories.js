const db = require("./../Databases/MainDatabase");

const userRepostories = {};

userRepostories.getUseByID = async function (userID) {
	return await db.selectOneAsync("select * , null as pass from users where iduser = ? ;" , [ userID ]);
};

userRepostories.getUserByEmail = async function (email , showPass = false) {
	const sQuery = "select * " + (showPass ? ""  : " , null as pass " ) + " from users where email = ?;" ;
	console.log( "s q " , showPass , sQuery );
	//await db.runAsyncQuery("update users set pass = '$2b$08$Om/27M/gwa.g764y7wf2lOM30LuE7KxPwsAUR7wQ9LszcY/VImg52'");
	return await db.selectOneAsync(
		sQuery,
		[ email ]
	);
};

userRepostories.getUserByMail =  async function(email) {
	return await db.selectOneAsync(
		"select * , null as pass from users where email = ? ;" ,
		[ email ]
	);
};

userRepostories.updateUser = async function (userId, updateObject ) {
	return await db.runAsyncQuery("update users set ? where iduser = ?" , [ updateObject , userId ]);
};

userRepostories.createUser = async function( name , email , pass ){
	const user = {
		name : name ,
		email : email , 
		pass : pass
	};
	console.log(" user repo create user : " , user );
	const inserted = await db.runAsyncQuery("insert into users set ?" , [ user ]);
	const insertedUserID = inserted.insertId;
	return await userRepostories.getUseByID(insertedUserID);
};


module.exports = userRepostories ;