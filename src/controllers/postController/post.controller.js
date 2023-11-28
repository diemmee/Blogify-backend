const makePostService = require("../../services/postService/post.service");
const ApiError = require("../../api-error");

async function createPost(req, res, next) {
    if (!req.body?.title) {
        return next(new ApiError(400, "Title can not be empty"));
    }
    try {
        const blogService = makePostService();
        const addedPost = await blogService.createPost(req.body);
        return res.send({
            message: "Post added successfully",
            post: addedPost,
        });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while creating new post")
        );
    }
}

async function getPostById(req, res, next) {
    try {
        const postId = req.params.postId;
        const blogService = makePostService();
        const post = await blogService.getPostById(postId);

        if (!post) {
            return next(new ApiError(404, "Post not found"));
        }

        res.json(post);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while fetching the post")
        );
    }
}

async function updatePost(req, res, next) {
    try {
        const blogController = makePostService();
        const updatedPost = await blogController.updatePost(
            req.params.postId,
            req.body
        );
        return res.send({
            message: "Post updated successfully",
            post: updatedPost,
        });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500,
                `Error updating the post with id=${req.params.postId}`
            )
        );
    }
}

async function getAllPosts(req, res) {
    try {
        const { getAllPosts } = makePostService();
        const users = await getAllPosts();

        if (!users) {
            return next(new ApiError(404, "Posts not found"));
        }
        return res.send(users);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error retrieving post with id=${req.params.id}`)
        );
    }
}

async function deletePost(req, res) {
    try {
        const blogService = makePostService();
        const deletedPost = await blogService.deletePost(req.params.postId);

        return res.send({
            message: `${deletedPost} post was deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error retrieving post with id=${req.params.id}`)
        );
    }
}

async function deleteAllPost(req, res, next) {
    try {
        const blogService = makePostService();
        const deleted = await blogService.deleteAllPost();

        return res.send({
            message: `${deleted} post was deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500,
                `An error occurred while removing all posts contact`
            )
        );
    }
}

async function searchPosts(req, res, next) {
    try {
        const blogService = makePostService();
        const searchResults = await blogService.searchPosts(req.query.keyword);

        console.log("Keyword:", req.query.keyword);

        return res.json(searchResults);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500,
                `An error occurred while removing all posts contact`
            )
        );
    }
}

module.exports = {
    getAllPosts,
    deletePost,
    deleteAllPost,
    searchPosts,
    createPost,
    updatePost,
    getPostById,
};
