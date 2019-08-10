module.exports = function(app,express,path,isLoggedIn) {
    app.use("/img", express.static(__dirname + '/../../../../chinuch-restaurant/public/images'));
}