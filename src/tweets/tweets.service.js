const Tweet = require("./Tweet");

const createTweet = async (message, userId) =>
  await Tweet.create({ message, user: userId });

const findAllTweets = async (offset, limit) =>
  await Tweet.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("user");

const countTweets = async () => await Tweet.countDocuments();

const searchTweet = async (message) =>
  await Tweet.find({
    message: { $regex: `${message || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

const likeTweet = async (id, userId) =>
  await Tweet.findOneAndUpdate(
    {
      _id: id,
      "likes.userId": { $nin: [userId] },
    },
    {
      $push: {
        likes: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );

const retweetTweet = async (id, userId) =>
  await Tweet.findOneAndUpdate(
    {
      _id: id,
      "retweets.userId": { $nin: [userId] },
    },
    {
      $push: {
        retweets: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );

const commentTweet = async (id, userId) =>
  await Tweet.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        comments: { userId, create: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );

module.exports = {
  createTweet,
  findAllTweets,
  searchTweet,
  likeTweet,
  retweetTweet,
  commentTweet,
  countTweets
};
