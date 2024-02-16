import 'dotenv/config';
import express from 'express';
import path from 'path'
import multer from 'multer';

import { mongoose } from './configs/connection';
import routes from './server/routes/index';

mongoose;

const server = express();

server.use(express.json());
server.use(routes);
server.use(express.static(path.join(__dirname, '..', 'tmp', '/uploads')))

server.listen(process.env.PORT, () => console.log('Server is running'));