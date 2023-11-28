const makeUserService = require("../../services/userService/user.service");

const ApiError = require("../../api-error");

async function getAllUsers(req, res) {
    try {
        const { getAllUsers } = makeUserService();
        const users = await getAllUsers();

        if (!users) {
            return next(new ApiError(404, "Users not found"));
        }
        return res.send(users);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error retrieving users with id=${req.params.id}`)
        );
    }
}

module.exports = { getAllUsers };
