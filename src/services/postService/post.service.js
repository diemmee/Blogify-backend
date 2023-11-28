const knex = require("../../database/knex");

function makePostService() {
    async function createPost(post) {
        const [postId] = await knex("posts").insert(post);
        return { postId, ...post };
    }

    async function updatePost(postId, updates) {
        await knex("posts").where({ postId: postId }).update(updates);
        return knex("posts").where({ postId: postId }).first();
    }

    async function getPostById(postId) {
        return knex("posts").where("postId", postId).first();
    }

    async function getAllPosts() {
        return knex("posts").select("*");
    }

    async function deletePost(postId) {
        return knex("posts").where("postID", postId).del();
    }

    async function deleteAllPost() {
        return knex("posts").del();
    }
    async function searchPosts(keyword) {
        return knex("posts")
            .where("title", "like", `%${keyword}%`)
            .orWhere("content", "like", `%${keyword}%`)
            .select("*");
    }

    return {
        createPost,
        getAllPosts,
        deletePost,
        deleteAllPost,
        searchPosts,
        updatePost,
        getPostById,
    };
}

module.exports = makePostService;
