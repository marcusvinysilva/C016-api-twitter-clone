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

module.exports = {
  createTweet,
};
