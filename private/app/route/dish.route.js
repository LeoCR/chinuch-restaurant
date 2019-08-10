module.exports = function(app,path) {
    const dish = require(path.resolve(__dirname+'/../db/controller/dish.controller.js')); 
    app.get('/api/get/main-courses', dish.getMainCourses);
    app.get('/api/get/appetizers',dish.getAppetizers);
    app.get('/api/get/desserts',dish.getDesserts);
    app.get('/api/dish/show/:id', dish.findById);
}