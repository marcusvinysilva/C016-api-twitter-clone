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
      avatar: tweet.user.avatar,
    })),
  });
};

const searchTweet = async (req, res) => {
  const { message } = req.query;

  const tweets = await tweetService.searchTweet(message);

  if (tweets.length === 0) {
    return res
      .status(400)
      .send({ message: "Não existem tweets com essa mensagem!" });
  }

  res.send({
    tweets: tweets.map((tweet) => ({
      id: tweet._id,
      message: tweet.message,
      likes: tweet.likes.length,
      comments: tweet.comments.length,
      retweets: tweet.retweets.length,
      name: tweet.user.name,
      username: tweet.user.username,
      avatar: tweet.user.avatar,
    })),
  });
};

const likeTweet = async (req, res) => {
  const { id } = req.params;

  const userId = req.userId;

  const tweetLiked = await tweetService.likeTweet(id, userId);

  if (tweetLiked.value == null) {
    return res.status(400).send({ message: "Você já deu like neste tweet!" });
  }

  res.send({
    message: "Like realizado com sucesso!",
  });
};

const retweetTweet = async (req, res) => {
  const { id } = req.params;

  const userId = req.userId;

  const tweetRetweeted = await tweetService.retweetTweet(id, userId);

  if (tweetRetweeted.value == null) {
    return res.status(400).send({ message: "Você já retwittou este tweet!" });
  }

  res.send({ message: "Retweet realizado com sucesso!" });
};

const commentTweet = async (req, res) => {
  const { id } = req.params;

  const userId = req.userId;

  await tweetService.commentTweet(id, userId);

  res.send({ message: "Comentário realizado com sucesso!" });
};

module.exports = {
  createTweet,
  findAllTweets,
  searchTweet,
  likeTweet,
  retweetTweet,
  commentTweet
};
