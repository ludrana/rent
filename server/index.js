import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/db.js';
import {User} from "./model/user.js";
import {Offer} from "./model/offer.js";
import {Review} from "./model/review.js";
import {router} from "./routes/index.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}`));
    } catch (e) {
        console.log(e + e);
    }
};

start();