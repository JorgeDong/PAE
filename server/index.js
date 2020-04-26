const express = require('express');
const app = express();
const layout = require('express-ejs-layouts');
const db = require('./config/mongodb.connection');

const PORT = process.env.PORT || 3000;

// EJS
app.use(layout);
app.set('view engine', 'ejs');  // No hagan caso a esto, es solo para mis pruebas

// Body-Parser
app.use(express.urlencoded( {extended:false} ));

// Using my ROUTES from routes/routes.js
app.use('/', require('./routes/routes'));
app.use('/api', require('./routes/user.route'));

app.listen(PORT, console.log(`Server runnign at port: ${PORT}`));
