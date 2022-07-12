const router = require("express").Router();

const tweetController = require("./tweets.controller");
const authMiddleware = require("../auth/auth.middleware");

router.post("/", authMiddleware, tweetController.createTweet);
router.get("/", authMiddleware, tweetController.findAllTweets);

module.exports = router;
