const knex = require("../../database/knex");

function makeUserService() {
    async function getUserById(id) {
        return knex("users").where({ user_id: id }).select("*").first();
    }

    async function getAllUsers() {
        return knex("users").select("*");
    }
    return {
        getUserById,
        getAllUsers,
    };
}

module.exports = makeUserService;
