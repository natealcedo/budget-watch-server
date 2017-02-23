import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

import routes from './routes';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api', routes);

mongoose.connect(process.env.DB, (err)=>{
    if (err){
        throw err;
    } else {
        console.log('Connected to DB');
    }
});

app.listen(process.env.PORT, ()=>{
    console.log('Server started Running on port', process.env.PORT);
});
