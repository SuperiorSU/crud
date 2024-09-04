const express = require('express')

const app = express()


require('dotenv').config();
const cors = require('cors');
app.use(cors());


app.use(express.json());
app.use('/api/v1', require('./routes/route'));
const dbConnect = require('./config/database');
dbConnect();

app.listen(process.env.PORT||4000, () => {
    console.log('Server is running on port 4000');
});

app.get('/', (req, res) => {
    res.send('Hello World');
});
