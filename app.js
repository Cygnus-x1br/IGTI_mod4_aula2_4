/**
 * Imports
 */

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { studentRouter } from './routes/studentRouter.js';

const app = express();
dotenv.config();
//require('dotenv' / config);

/**Rotina para conectar à base de dados no atlas.
 * !No mongoDB atlas podemos criar usuários específicos para a base de dados.
 * !Podemos por exemplo criar um usuário com poderes apenas para ler a base e
 * !configurar na conexão da base esse usuário.
 */

console.log(process.env.USERDB);
//Conexão com o mongoDB
(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERDB}:${process.env.PWDDB}@cygnus-lskuq.gcp.mongodb.net/grades?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    //.then(console.log('Conectado ao MongoDB Atlas'));
  } catch (err) {
    console.log('Erro ao conectar ao MongoDB Atlas' + err);
  }
})();

app.use(express.json());
app.use(studentRouter);

app.listen(process.env.PORT, () => console.log('API iniciada'));
