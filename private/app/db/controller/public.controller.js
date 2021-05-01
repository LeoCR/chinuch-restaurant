const path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
sequelize=db.sequelize;

// Find a Product by Id
exports.findIngredients = (req, res) => {	
    const idDish=req.params.id;
    const sqlFindIngredients="SELECT ingredient.id,ingredient.name,ingredient.img,"+
    " ingredient_dish.id_ingredient,ingredient_dish.id_dish FROM ingredient "+
    " JOIN ingredient_dish ON ingredient.id = ingredient_dish.id_ingredient "+
    " WHERE ingredient_dish.id_dish='" + idDish+"';";
   sequelize.query(sqlFindIngredients, { type: sequelize.QueryTypes.SELECT})
   .then(ingredients => {
        res.send(ingredients);     
    })
}