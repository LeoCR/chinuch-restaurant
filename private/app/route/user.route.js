module.exports = function(app,path,isLoggedIn) {
    const user = require(path.resolve(__dirname+'/../db/controller/user.controller.js')); 
    
    app.get('/api/find/email/:email', user.findByEmail);
    app.get('/api/users', user.findAll);
    app.get('/api/find/id/:id',isLoggedIn,user.findById);
    app.get('/api/user/show/:id',user.findById);
    app.put('/api/user/update/:id',user.update);
    app.post('/api/user/add/',user.create)
    app.get('/api/user/info',user.getUser);
    
}