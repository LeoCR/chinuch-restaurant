const path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
Ingredient = db.ingredient,
sequelize=db.sequelize;
exports.findAll = (req, res) => {
	Ingredient.findAll({
		order: [
      ['name', 'ASC'],
    ]
	}).then(ingredient => {
	  res.send(ingredient);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.findById = (req, res) => {	
	Ingredient.findByPk(req.params.id).then(ingredient => {
		res.send(ingredient);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.getIngredientsByDish=(req,res)=>{
	const sqlFindIngredientsByDish="SELECT ingredient_dish.id_ingredient_dish,ingredient_dish.id_ingredient, "+
	" ingredient_dish.id_dish,ingredient.name,ingredient.img FROM ingredient_dish "+
	" INNER JOIN  ingredient ON ingredient.id=ingredient_dish.id_ingredient WHERE ingredient_dish.id_dish='" +req.params.idDish+"' ;";
	sequelize.query(sqlFindIngredientsByDish, { type: sequelize.QueryTypes.SELECT})
	.then(ingredients => {
				res.send(ingredients);     
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}