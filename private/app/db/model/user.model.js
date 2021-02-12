module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define('reef_user', {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        firstname: {
            type: Sequelize.STRING,
            //notEmpty: true
        },
        lastname: {
            type: Sequelize.STRING,
            //notEmpty: true
        },
        username: {
            type: Sequelize.TEXT
        },
        about: {
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING//,
            //allowNull: false
        },
        last_login: {
            type: Sequelize.DATE
        },
        updated_at:{
            type:Sequelize.DATE
        },
        created_at:{
            type:Sequelize.DATE
        },
        status: {
            type: Sequelize.STRING
        },
        provider: {
            type: Sequelize.STRING
        },
        id_user: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });
    return User;
}