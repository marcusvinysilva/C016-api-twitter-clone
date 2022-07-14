const router = require("express").Router();

const tweetController = require("./tweets.controller");
const authMiddleware = require("../auth/auth.middleware");

router.post("/", authMiddleware, tweetController.createTweet);
router.get("/", authMiddleware, tweetController.findAllTweets);
router.get("/search", authMiddleware, tweetController.searchTweet);

module.exports = router;
