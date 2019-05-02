const postController = {};
const postRepository = require('./../Repositories/postRepositories.js');

postController.createPost = async function( user , topicId , text ){
    let insertedId = await postRepository.createPost( user.iduser, topicId, text );
    return insertedId;
}


module.exports = postController;