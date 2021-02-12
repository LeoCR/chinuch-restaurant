const Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config()

const sequelize = new Sequelize(process.env.HEROKU_DATABASE, process.env.HEROKU_USERNAME, process.env.HEROKU_PASSWORD, {
  host: process.env.HEROKU_HOST,
  dialect: 'mysql',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    freezeTableName: true,
    underscored: true,
    timestamps: false
},
  port: "3306",
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
db.user=require(path.resolve(__dirname+'/../model/user.model.js'))(sequelize, Sequelize);
db.dish=require(path.resolve(__dirname+'/../model/dish.model.js'))(sequelize, Sequelize);
db.drink=require(path.resolve(__dirname+'/../model/drink.model.js'))(sequelize, Sequelize);
db.ingredient=require(path.resolve(__dirname+'/../model/ingredient.model.js'))(sequelize, Sequelize);
db.ingredientDish=require(path.resolve(__dirname+'/../model/ingredientDish.model.js'))(sequelize,Sequelize);
db.invoiceDetail=require(path.resolve(__dirname+'/../model/invoiceDetail.model.js'))(sequelize,Sequelize);
db.headerInvoice=require(path.resolve(__dirname+'/../model/headerInvoice.model.js'))(sequelize,Sequelize);
db.reservation=require(path.resolve(__dirname+'/../model/reservation.model.js'))(sequelize,Sequelize);
module.exports = db;