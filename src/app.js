import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerFile from '../src/documentation/swagger.json';

import rotaUser from './routes/userRoutes';
import rotaCep from './routes/cepRoutes';
import rotaInfo from './routes/infoRoutes';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use('/info', rotaInfo);
app.use('/users', rotaUser);
app.use('/cep', rotaCep);

app.use((req, res, next) => {
  const error = new Error('Não encontrado');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    error: {
      mensagem: error.message,
    },
  });
});

export default app;
