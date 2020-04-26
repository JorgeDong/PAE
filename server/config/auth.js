module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        console.log('Error: Please check you auth');
        res.redirect('/');
    }
}