const path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
Drink = db.drink;
exports.findAll = (req, res) => {
	Drink.findAll().then(drink => {
	  res.send(drink);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.findById = (req, res) => {	
	Drink.findByPk(req.params.id).then(drink => {
		res.send(drink);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};