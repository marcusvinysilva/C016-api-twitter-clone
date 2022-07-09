const User = require("../users/User");

const login = async (email) => await User.findOne({ email: email }).select("+password")

module.exports = { login };
