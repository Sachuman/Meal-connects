const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors');


app.use(cors());
app.use(bodyParser.json());



const donorsRouter = require('./routes/donors');
const sheltersRouter = require('./routes/shelters');
const timelineRouter = require('./routes/timeline');

app.use('/donors', donorsRouter);
app.use('/shelters', sheltersRouter);
app.use('/timeline', timelineRouter);

module.exports = app;