const router = require("express").Router();

const tweetController = require("./tweets.controller");
const authMiddleware = require("../auth/auth.middleware");

router.post("/", authMiddleware, tweetController.createTweet);
router.get("/", authMiddleware, tweetController.findAllTweets);
router.get("/search", authMiddleware, tweetController.searchTweet);
router.patch("/:id/like", authMiddleware, tweetController.likeTweet);
router.patch("/:id/retweet", authMiddleware, tweetController.retweetTweet);
router.patch("/:id/comment", authMiddleware, tweetController.commentTweet);

module.exports = router;
