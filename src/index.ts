import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { AppDataSource } from './settings/appDataSource';

const app = express();

app.use(express.json());
dotenv.config();

routes(app);
app.get('/', (req, res) => {
    res.send('Hello Beautiful');
});

AppDataSource.initialize();

const PORT = process.env.PORT || 3000;;
app.listen(PORT, () => {
 console.log(`App running on port ${PORT}`);
});
