const Tweet = require("./Tweet");

const createTweet = async (message, userId) =>
  await Tweet.create({ message, user: userId });

const findAllTweets = async () => await Tweet.find().sort({ _id: -1 }).populate("user");

module.exports = {
  createTweet,
  findAllTweets,
};
