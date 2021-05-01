const path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
User = db.user;
const bCrypt = require('bcrypt-nodejs');
exports.findAll=(req,res)=>{
    User.findAll().then(user => {
        res.send(user);
    }).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}
exports.findByEmail=(req,res)=>{
    User.findOne({ where: {email: req.params.email} }).then(user => {
        // project will be the first entry of the Projects table with the title 'aProject' || null
        if(user){
            res.send(user)
        }
        else{
            res.json({user:null});
        }
    }).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}
exports.findById = (req, res) => {	
	User.findByPk(req.params.id).then(user => {
		res.send(user);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
const generateHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};
exports.update=(req,res)=>{
    const userPassword = generateHash(req.body.password);
    User.update({  
        id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username:req.body.username,
        about:req.body.about,
        email: req.body.email,
        password:userPassword
    }, 
  { where: {id: req.body.id}}).then(user => {	
          res.status(200).send(user);
    }).catch(err => {
      res.status(500).json({msg: "An error occurred.", details: err});
  });
}
exports.create=(req,res)=>{
    const userPassword = generateHash(req.body.password);
    User.create({  
        id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username:req.body.username,
        about:req.body.about,
        email: req.body.email,
        password:userPassword
    }).then(user => {	
          res.status(200).send(user);
    }).catch(err => {
      res.json({msg: "An error occurred.", details: err});
  });
}
exports.getUser=(req,res)=>{
    if(req.user){
        if(req.user._json){
            User.findOne({ where: {email: req.user.emails[0].value} }).then(user => {
                if(user){
                    res.send(user)
                }
                else{
                    res.json({user:null});
                }
            }) 
        }
        else{
            User.findOne({ where: {email: req.user.email} }).then(user => {
                if(user){
                    res.send(user)
                }
                else{
                    res.json({user:null});
                }
            }) 
        }
    }
    else{
      res.json({user:null})
    }
}