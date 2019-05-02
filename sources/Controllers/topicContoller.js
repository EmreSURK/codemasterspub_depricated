const topicRepostories = require("./../Repositories/topicRepostories");
const topicController = {};

topicController.getLeftMenuTopics = async function () {
	return topicRepostories.getTopics(topicRepostories.topicPurposes.leftMenu);
};

topicController.getDemoTopics = async function () {
	return topicRepostories.getTopics(topicRepostories.topicPurposes.mainPageDemo)
};

topicController.getTopicByID = async function (topicID , includePosts = false ) {
	return await topicRepostories.getTopicByID(topicID , includePosts )
};

topicController.createTopic = async function( user , titleText ){
    return await topicRepostories.createTopic( user.iduser , titleText )
}


module.exports = topicController;