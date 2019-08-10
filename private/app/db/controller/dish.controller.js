var path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
sequelize=db.sequelize,
Dish = db.dish;
exports.getMainCourses=(req,res)=>{
	var sqlGetMainCourses="SELECT * FROM dish WHERE category='Main Course';";
    sequelize.query(sqlGetMainCourses, { type: sequelize.QueryTypes.SELECT})
    .then(user => {
                res.send(user);     
    })
}
exports.getAppetizers=(req,res)=>{
	var sqlGetMainCourses="SELECT * FROM dish WHERE category='Appetizer';";
    sequelize.query(sqlGetMainCourses, { type: sequelize.QueryTypes.SELECT})
    .then(user => {
                res.send(user);     
    })
}
exports.getDesserts=(req,res)=>{
	var sqlGetMainCourses="SELECT * FROM dish WHERE category='Dessert';";
    sequelize.query(sqlGetMainCourses, { type: sequelize.QueryTypes.SELECT})
    .then(user => {
                res.send(user);     
    })
}
exports.findAll = (req, res) => {
	Dish.findAll().then(dish => {
	  res.send(dish);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.findById = (req, res) => {
	Dish.findByPk(req.params.id).then(dish => {
		res.send(dish);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
