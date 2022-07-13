const tweetService = require("./tweets.service");

const createTweet = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    res.status(400).send({
      message: "Você não digitou uma mensagem!",
    });
  }

  const { id } = await tweetService.createTweet(message, req.userId);

  return res.send({
    tweet: {
      id,
      message,
    },
  });
};

const findAllTweets = async (req, res) => {
  const tweets = await tweetService.findAllTweets();

  if (tweets.length === 0) {
    return res.send({ message: "Não existem tweets!" });
  }

  res.send({
    results: tweets.map((tweet) => ({
      id: tweet._id,
      message: tweet.message,
      likes: tweet.likes.length,
      comments: tweet.comments.length,
      retweets: tweet.retweets.length,
      name: tweet.user.name,
      username: tweet.user.username,
      avatar: tweet.user.avatar
    })),
  });
};

module.exports = {
  createTweet,
  findAllTweets,
};
