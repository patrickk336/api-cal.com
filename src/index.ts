import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

const app = express();

app.use(express.json());
dotenv.config();

routes(app);
app.get('/', (req, res) => {
 res.send('Hello Beautiful');
});

const PORT = 5000;
app.listen(PORT, () => {
 console.log(`App running on port ${PORT}`);
});
