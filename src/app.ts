import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(
  (erro: Error, request: Request, response: Response, _: NextFunction) => {
    if (erro instanceof AppError) {
      return response.status(erro.statusCode).json({
        status: 'error',
        message: erro.message,
      });
    }

    console.error(erro);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

export default app;
