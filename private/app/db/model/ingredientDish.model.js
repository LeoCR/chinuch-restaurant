module.exports = (sequelize, Sequelize) => {
    const INGREDIENT_DISH = sequelize.define('ingredient_dish', {
        id_ingredient_dish: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        id_ingredient:Sequelize.STRING,
        id_dish: Sequelize.STRING
        },{
            timestamps: false
    });
	return INGREDIENT_DISH;
}