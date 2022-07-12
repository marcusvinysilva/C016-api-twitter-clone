require("dotenv").config();
const jwt = require("jsonwebtoken");
const { findByIdUser } = require("../users/users.service");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "O token não foi informado!" });
  }

  const parts = authHeader.split(" "); /*[Bearer, aljkdhfhsdgfbhbsdfvhsadf]*/

  if (parts.length !== 2) {
    return res.status(401).send({ message: "Token inválido!" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ message: "Token malformatado!" });
  }

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Token inválido!" });
    }

    const user = await findByIdUser(decoded.id);

    req.userId = user.id;

    return next();
  });
};
