const Tweet = require("./Tweet");

const createTweet = async (message, userId) =>
  await Tweet.create({ message, user: userId });

module.exports = {
  createTweet,
};
