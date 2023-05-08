import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

// Rest object
const app = express();

// Middlewares
dotenv.config();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => { res.send("Hello Welcome") })

const PORT = process.env.PORT;
// Listen Port
app.listen(PORT, () => {
    console.log(`Server Listening on Port ${PORT}`);
})