const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.set('trust proxy', 1);

app.use(cors({
    origin: 'https://alexisbergel.com',
    optionsSuccessStatus: 200,
}));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require('./routers');
app.use(router);

app.listen(3001);