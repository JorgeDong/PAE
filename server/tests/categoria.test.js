const request = require('supertest');

module.exports = function(app) {
    request(app)
    .get('/api/categoria')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
        console.log(res)
    if (err){
        throw err;
    }

    });

};