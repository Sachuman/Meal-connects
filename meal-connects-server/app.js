const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors');


app.use(cors());
app.use(bodyParser.json());



const donorsRouter = require('./routes/donors');
const sheltersRouter = require('./routes/shelters');

app.use('/donors', donorsRouter);
app.use('/shelters', sheltersRouter);

module.exports = app;