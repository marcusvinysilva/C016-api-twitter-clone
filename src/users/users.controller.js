const userService = require("./users.service");

const createUser = async (req, res) => {
  const { name, username, email, password, avatar } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).send({
      message:
        "Alguns campos estão faltando. Os campos obrigatórios são: 'name', 'username', 'email' e 'password' ",
    });
  }

  const foundUserByEmail = await userService.findByEmail(email);
  const foundUserByUsername = await userService.findByUsername(username);

  if (foundUserByEmail || foundUserByUsername) {
    return res
      .status(400)
      .send({ message: "Usuário com esse email/username já existe!" });
  }

  const user = await userService
    .createUser(req.body)
    .catch((error) => console.log(error));

  if (!user) {
    return res
      .status(500)
      .send({ message: "Aconteceu algum erro ao criar o usuário. Tente novamente mais tarde!" });
  }

  res.status(201).send(user);
};

const findAllUsers = async (req, res) => {
  const users = await userService.findAllUsers();

  if (users.length == 0) {
    return res.status(206).send({ message: "Não existem usuários cadastrados!" })
  }

  res.send(users)
}

module.exports = {
  createUser,
  findAllUsers
};
