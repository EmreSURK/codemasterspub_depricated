/**
 * Created by Emre on 15/09/15.
 */

const express = require('express');
const router = express.Router();
const topicController = require("./../sources/Controllers/topicContoller");
const mailHelper = require('./../sources/Helpers/mailHelper.js');


router.get('/test', async function (request, response, next) {
	console.log(" test page. ");
	
	/*mailHelper.sendMail();
	response.render('./../sources/Helpers/mail' , {
		senderUser : { name : 'test' },
		inviteCode : "test123test123"
	});*/
});

router.get('/:topicID?', async function (req, res, next) {
	
	let topicID = req.params.topicID || "";
	if (topicID.indexOf("--") > 0) {
		const urlParts = topicID.split("--"); // retuns [123] for 123
		topicID = urlParts[0] || "" ;
	} else {
		topicID = "";
	}
		
	let currentTopic = undefined ;
	let topicDemos = undefined ;
	
	if ( topicID != "" ){
		currentTopic = await topicController.getTopicByID(topicID , true)
	} else {
		topicDemos = await topicController.getDemoTopics();
	}
	
	const topics = await topicController.getLeftMenuTopics();
	const responseObj = {
		topics: topics,
		topic : currentTopic,
		demoTopics  : topicDemos
	};
	res.render(
		'topicContent.jade',
		responseObj	
	);
});


module.exports = router;
