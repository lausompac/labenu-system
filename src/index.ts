import express from 'express'
import cors from 'cors'
import { ping } from './endpoints/ping';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
    console.log(`Server is running on port ${process.env.PORT || 3003}`)
});

// GET Ping
app.get('/ping', ping);