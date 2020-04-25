const mongoose = require('mongoose');
const URI = 'mongodb+srv://admin:admin@pae-u17vu.mongodb.net/proyecto?retryWrites=true&w=majority';

mongoose.connect(URI)
    .then(db => console.log('db is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;