import express from 'express';
import cors from 'cors';
import MySQLConnector from './api/utils/connector';
import { addUser } from './api/routes/addUser';
import { getAll } from './api/routes/getAll';
import { login } from './api/routes/login';
import { removeUsers } from './api/routes/removeUsers';
import middleware from './api/middleware/middleware';
import { block } from './api/routes/block';
import { unblock } from './api/routes/unblock';

const app = express();
const port = 3001;
MySQLConnector.init();
app.use(cors());
app.use(express.json());

app.use('/api/users', addUser);
app.use('/api/users', login);

app.use('/api/users', getAll);
app.use('/api/users', block);
app.use('/api/users', unblock);
app.use('/api/users', removeUsers);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandling);

app.listen(port, () => {
    console.log(`Task4-back listening at http://localhost:${port}`);
});
