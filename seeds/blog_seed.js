const fs = require("fs");
const path = require("path");

exports.seed = async function (knex) {
    try {
        const dataFilePath = path.resolve(__dirname, "../src/data/data.json");
        const jsonData = fs.readFileSync(dataFilePath, "utf8");
        const data = JSON.parse(jsonData);

        await knex("users").insert(data.users);
        await knex("posts").insert(data.posts);
        await knex("comments").insert(data.comments);
        await knex("likes").insert(data.likes);
    } catch (error) {
        console.error("Error seeding data:", error);
    }
};
