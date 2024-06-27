const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const router = require('./routers');



app.use(cors({
    origin: 'https://alexisbergel.com',
    optionsSuccessStatus: 200,
}));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.listen(3001);