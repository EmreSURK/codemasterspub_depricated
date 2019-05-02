const db = require("./../Databases/MainDatabase");
const userRepository = require("./../Repositories/userRepostories");

const postRepos = {};

postRepos.getTopicPosts = async function (topicID , limit = false) {
	let sQuery = "select * from post where posttopicid = ? ";
	if ( !isNaN(parseInt(limit)) ) {
		sQuery += " limit " + limit ;
	}
	
	const posts = await db.runAsyncQuery( sQuery , [ topicID ] );
	for (let i = 0; i < posts.length; i++) {
		let currentPost = posts[i];
		currentPost.user = await userRepository.getUseByID(currentPost.postuserid);
	}
	return posts;
};

postRepos.createPost = async function( posterUserId, topicId, text ){
	const post = {
		posttopicid : topicId,
		text : text ,
		postuserid : posterUserId
	};
	let inserted = await db.runAsyncQuery("insert into post set ?" , [ post ] );
	return inserted.insertId;
}

module.exports = postRepos;
