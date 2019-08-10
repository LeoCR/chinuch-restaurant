module.exports = function(app, passport,path) {
    var authController = require(path.resolve(__dirname+'/../db/controller/auth.controller.js'));
    app.post('/api/signup', passport.authenticate('local-signup', {
        successRedirect: '/checkout',
        failureRedirect: '/'
        }
    ));
    app.post('/api/login', passport.authenticate('local-signin', {
            successRedirect: '/checkout/',
            failureRedirect: '/'
        }
    ));
}