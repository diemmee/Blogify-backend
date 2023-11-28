const express = require("express");
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");
const postController = require("../controllers/postController/post.controller");
const userController = require("../controllers/userController/user.controller.js");

router.route("/users").get(userController.getAllUsers).all(methodNotAllowed);

router
    .route("/posts/:postId")
    .get(postController.getPostById)
    .delete(postController.deletePost)
    .put(postController.updatePost)
    .all(methodNotAllowed);

router
    .route("/posts")
    .post(postController.createPost)
    .get(postController.getAllPosts)
    .get(postController.searchPosts)
    .delete(postController.deleteAllPost)
    .all(methodNotAllowed);

module.exports = router;
