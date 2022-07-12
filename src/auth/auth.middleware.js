const jwt = require("jsonwebtoken"); // importamos o jwt para fazer a verificação do token
const { findByIdUser } = require("../users/users.service"); // criamos uma função para encontrar o usuário por id

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization; // guardamos o token que vem pelo header

  if (!authHeader) {
    return res.status(401).send({ message: "O token não foi informado!" }); // verificamos se o auth não está vazio
  }

  const parts = authHeader.split(" "); // todo o token deve vir com o prefixo Bearer, quebramos em duas partes e inserimos em um array para analisarmos ficando o Bearer e o token como elementos distintos: [Bearer, aljkdhfhsdgfbhbsdfvhsadf]

  if (parts.length !== 2) {
    return res.status(401).send({ message: "Token inválido!" }); // verificamos se estão somente em duas partes, menos ou mais que 2 é inválido pois foge do padrão
  }

  const [scheme, token] = parts; // colocamos as duas informações em constantes para analisarmos

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ message: "Token malformatado!" }); // utilizando uma RegEx verificamos se o primeiro elemento é exatamente a palavra "Bearer"
  }

  // passada todas essa validações, agora validaremos o token de fato

  jwt.verify(token, process.env.SECRET, async (err, decoded) => { // utilizamos o método verify do JWT pasando o token a ser analisado, a chave secreta e a função de análise
    if (err) {
      return res.status(401).send({ message: "Token inválido!" }); // verificamos se o token é valido através da existência de um erro ou não
    }

    const user = await findByIdUser(decoded.id); // caso não exista um erro, decodificamos o token, retiramos a informação do id e passamos para a função buscar as informações do usuário que "criou" o token

    req.userId = user.id; // inserimos esse id na requisição para que ele possa ser utilizado nas rotas

    return next(); // como estamos desenvolvendo um middleware, finalizamos com o next() para que a próxima função possa ser executada. Nesse caso, o controller.
  });
};
