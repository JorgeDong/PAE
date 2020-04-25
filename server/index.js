const express = require('express');
const cors = require('cors');
const app = express();

const { mongoose } = require('./db/db');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());



// Routes
app.use('/api/employees', require('./routes/example.routes'));

app.get('/', function (req, res) {
    res.send('Hello World')
});

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});