var nodemailer = require('nodemailer');
module.exports = function(app,express,path,isLoggedIn) {
    const publicController = require(path.resolve(__dirname+'/../db/controller/public.controller.js')); 
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'restaurantnodejscr@gmail.com',
        pass: 'ls@ElB#nn3rP@raM)sICanQu7stBaby(#4Gntar3Volver@Uni1ElC13loY3P@rais'
        }
    });
    app.post('/submit/contact-form',function(req,res){
        if(req.body.fullName!=='' & req.body.phoneNumber!=='' 
        && req.body.email!==''&& req.body.comment!==''){
            var message='<h4>Full Name:</h4><p>'+req.body.fullName+'</p>';
            message+='<h4>Telephone:</h4><p>'+req.body.phoneNumber+'</p>';
            message+='<h4>Email:</h4><p>'+req.body.email+'</p>';
            message+='<h4>Comment:</h4><p>'+ req.body.comment+'</p>';
            var mailOptions = {
                from: 'restaurantnodejscr@gmail.com',
                to: 'restaurantnodejscr@gmail.com',
                subject: 'Restaurant Contact Form',
                html: message
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  res.send(req.body)
                }
            });
        }
        else{
            res.send({contact:null})
        }
    })
    app.get('/api/dish/ingredients/:id',publicController.findIngredients);
    app.use("/img", express.static(__dirname + '/../../../../chinuch-restaurant/public/images'));
    app.use("/img/uploads",express.static(__dirname+'/../../../../chinuch-restaurant/public/images/uploads'))
}