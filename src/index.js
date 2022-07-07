require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./database/database");

const port = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

connectToDatabase();

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
