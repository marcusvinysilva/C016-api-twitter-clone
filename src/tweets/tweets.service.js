const Tweet = require("./Tweet");

const createTweet = async (message, userId) =>
  await Tweet.create({ message, user: userId });

const findAllTweets = async () =>
  await Tweet.find().sort({ _id: -1 }).populate("user");

const searchTweet = async (message) =>
  await Tweet.find({
    message: { $regex: `${message || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

module.exports = {
  createTweet,
  findAllTweets,
  searchTweet,
};
