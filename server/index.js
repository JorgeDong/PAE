const express = require('express');
const app = express();
const layout = require('express-ejs-layouts');
const db = require('./config/mongodb.connection');
const passport = require('passport');

const PORT = process.env.PORT || 3000;
require('./config/passport')(passport);     // Passport config

// EJS
app.use(layout);
app.set('view engine', 'ejs');  // No hagan caso a esto, es solo para mis pruebas

// Body-Parser
app.use(express.urlencoded( {extended:false} ));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Using my ROUTES from routes/routes.js
app.use('/', require('./routes/routes'));
app.use('/api', require('./routes/user.route'));

app.listen(PORT, console.log(`Server runnign at port: ${PORT}`));