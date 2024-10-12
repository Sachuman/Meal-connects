require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5001;

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})


app.use(cors());
app.use(express.json());

const donorsRouter = require('./routes/donors');
const sheltersRouter = require('./routes/shelters');
app.use('/donors', donorsRouter);
app.use('/shelters', sheltersRouter);
