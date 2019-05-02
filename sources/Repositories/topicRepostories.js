const topicRepostories = {};
const db = require('./../Databases/MainDatabase');
const userRepostoris = require("./userRepostories");
const postRepostory = require("./../Repositories/postRepositories");

topicRepostories.topicPurposes = {
	leftMenu : "leftmenu",
	mainPageDemo : "mainpagedemo"
};

topicRepostories.getTopics = async function ( purpose = topicRepostories.topicPurposes.leftMenu ) {
	let sQuery = "select * from topics";
	if(purpose == topicRepostories.topicPurposes.mainPageDemo){
		sQuery += " order by rand() limit 20";
	}
	
	const topics = await db.runAsyncQuery(sQuery);
	for (let i = 0; i < topics.length; i++) {
		let currentTopic = topics[i];
		let currentUserID = currentTopic.userid;
		currentTopic.user = await userRepostoris.getUseByID(currentUserID);
	}
	
	if(purpose == topicRepostories.topicPurposes.mainPageDemo ){
		for (let i = 0; i < topics.length; i++) {
			let currentTopic = topics[i];
			const posts = await postRepostory.getTopicPosts(currentTopic.idtopic , 1 );
			currentTopic.posts = posts;
		}
	}
	
	return topics;
};

topicRepostories.getTopicByID = async function (topicID, includePosts = false) {
	const topic = await db.selectOneAsync("select * from topics where idtopic = ? ", [ topicID ]);
	topic.user = await userRepostoris.getUseByID(topic.userid);
	if(includePosts){
		topic.posts = await postRepostory.getTopicPosts(topic.idtopic);
	}
	return topic;
};

topicRepostories.createTopic = async function( userId , topicTitle ){
	const topicBean = {
		userid : userId , 
		title : topicTitle
	}
	const inserted = await db.runAsyncQuery("insert into topics set ? ", [ topicBean ]) ;
	return inserted.insertId;
}

module.exports = topicRepostories;