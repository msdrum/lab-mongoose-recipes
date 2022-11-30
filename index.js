import express, { application } from "express";
import * as dotenv from "dotenv";
import connect from "./config/db.config.js";
import recipeRoute from "./routes/recipies.routes.js";

//habilitar o servidor a ter variáveis de ambiente
dotenv.config();

//instanciar a variável que vai ficar responsável pelo nosso servidor -> app
const app = express();

//configurar o servidor para aceitar enviar e receber arquivos em JSON
app.use(express.json());

//Conectando com o Banco de Dados
connect();

app.use("/recipies", recipeRoute);

// o servidor subindo pro ar.
app.listen(process.env.PORT, () => {
  console.log(`App running on port http://localhost:${process.env.PORT}`);
});
