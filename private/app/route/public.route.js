module.exports = function(app,express,path,isLoggedIn) {
    const publicController = require(path.resolve(__dirname+'/../db/controller/public.controller.js')); 
    app.get('/api/dish/ingredients/:id',publicController.findIngredients);
    app.use("/img", express.static(__dirname + '/../../../../chinuch-restaurant/public/images'));
    app.use("/img/uploads",express.static(__dirname+'/../../../../chinuch-restaurant/public/images/uploads'))
}