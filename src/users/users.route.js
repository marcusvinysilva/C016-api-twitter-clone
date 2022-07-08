const router = require("express").Router();
const usersController = require("./users.controller");

router.post("/", usersController.createUser)
router.get("/", usersController.findAllUsers)

module.exports = router