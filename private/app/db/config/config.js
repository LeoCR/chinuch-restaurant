const Sequelize = require('sequelize');
const path = require('path');
const sequelize = new Sequelize('reef_chinuch_restaurant', 'leo', '79461313', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    freezeTableName: true,
    underscored: true,
    timestamps: false
},
  port: "5432",
  pool: {
    max: 10500,
    min: 0,
    acquire: 3000000,
    idle: 1000000
  }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.reef_user=require(path.resolve(__dirname+'/../model/user.model.js'))(sequelize, Sequelize);
db.dish=require(path.resolve(__dirname+'/../model/dish.model.js'))(sequelize, Sequelize);
db.drink=require(path.resolve(__dirname+'/../model/drink.model.js'))(sequelize, Sequelize);
db.ingredient=require(path.resolve(__dirname+'/../model/ingredient.model.js'))(sequelize, Sequelize);
db.ingredientDish=require(path.resolve(__dirname+'/../model/ingredientDish.model.js'))(sequelize,Sequelize);
module.exports = db;