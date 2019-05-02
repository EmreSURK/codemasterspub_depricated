/**
 * Created by Emre on 15/09/15.
 */

const express = require('express');
const router = express.Router();
const postController    = require("./../sources/Controllers/postController.js");
const topicController   = require("./../sources/Controllers/topicContoller.js");

router.post('/' , async function( request , response ){
    if( request.session.user == undefined ){
        response.redirect('/');
        return;
    }

    const topicId = request.body.idtopic;
    const text = request.body.content;

    await postController.createPost( request.session.user , topicId , text );

    const topicUrl = request.session.user.lastUrl || '/' + topicId + "--" + "created";
    response.redirect( topicUrl );
});

router.get('/newtopic' , async function(request , response){
    if( request.session.user == undefined ){
        response.redirect('/');
        return;
    }
    // todo açılmak istenen konu başlığı ara. 
    response.render('newtopic.jade');
})

router.post('/newtopic' , async function(request , response){
    if( request.session.user == undefined ){
        response.redirect('/');
        return;
    }
    
    const user = request.session.user;
    const title = request.body.title;

    const topicId = await topicController.createTopic( user , title );

    response.redirect( "/" + topicId + "--." )

})

module.exports = router;
