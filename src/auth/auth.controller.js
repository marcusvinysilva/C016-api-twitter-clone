const authService = require("./auth.service");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.login(email);

  if (!user) {
    return res.status(400).send({ message: "Informações de login inválidas!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).send({ message: "Informações de login inválidas!" });
  }

  const token = authService.generateToken(user.id);

  res.send({ token });
};

module.exports = { login };
