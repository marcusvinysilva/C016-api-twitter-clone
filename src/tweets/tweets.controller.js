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
  let { limit, offset } = req.query;

  offset = Number(offset);
  limit = Number(limit);

  if (!offset) {
    offset = 0;
  }

  if (!limit) {
    limit = 5;
  }

  const tweets = await tweetService.findAllTweets(offset, limit);

  const total = await tweetService.countTweets();

  const currentUrl = req.baseUrl;

  const next = offset + limit;

  const nextUrl =
    next < total ? `${currentUrl}?offset=${next}&limit=${limit}` : null;

  /*   let nextUrl;
  if (next < total) {
    nextUrl = `${currentUrl}?offset=${next}&limit=${limit}`;
  } else {
    nextUrl = null;
  } */

  const previous = offset - limit < 0 ? null : offset - limit;

  const previousUrl =
    previous != null ? `${currentUrl}?offset=${previous}&limit=${limit}` : null;

  /*   let previousUrl;
  if (previous != null) {
    previousUrl = `${currentUrl}?offset=${previous}&limit=${limit}`;
  } else {
    previousUrl = null;
  } */

  if (tweets.length === 0) {
    return res.send({ message: "Não existem tweets!" });
  }

  res.send({
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,

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
  commentTweet,
};
