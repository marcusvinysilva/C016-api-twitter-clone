const router = require("express").Router();
const usersController = require("./users.controller");

router.post("/", usersController.createUser)

module.exports = router