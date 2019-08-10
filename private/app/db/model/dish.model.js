module.exports = (sequelize, Sequelize) => {
    const DISH = sequelize.define('dish', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name:Sequelize.STRING,
        description: Sequelize.STRING,
        picture:  Sequelize.STRING,
        category: Sequelize.STRING,
        subcategory: Sequelize.STRING,
        price:Sequelize.DECIMAL
        },{
            timestamps: false
    });
	return DISH;
}