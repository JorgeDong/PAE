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

app.use(express.json());

// Using my ROUTES from routes/routes.js
app.use('/', require('./routes/routes'));
app.use('/api', require('./routes/user.route'));

app.use('/api/categoria', require('./routes/categorias.routes'));
app.use('/api/imagen', require('./routes/imagen.routes'));
app.use('/api/producto', require('./routes/producto.routes'));
app.use('/api/subasta', require('./routes/subasta.routes'));
app.use('/api/puja', require('./routes/puja.routes'));
app.use('/api/comentario', require('./routes/comentario.routes'));
app.use('/api/credito', require('./routes/credito.routes'));

require('./tests/categoria.test')(app);


app.listen(PORT, console.log(`Server runnign at port: ${PORT}`));
