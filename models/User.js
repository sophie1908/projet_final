module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "user", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nom: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: true
            },
            prenom: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: true
            },
            date_de_naissance: {
                type: Sequelize.DataTypes.DATEONLY,
                allowNull: true
            },
            adresse: {
                type: Sequelize.DataTypes.STRING(150),
                allowNull: true
            },
            complement_adresse: {
                type: Sequelize.DataTypes.STRING(150),
                allowNull: true
            },
            cp: {
                type: Sequelize.DataTypes.INTEGER(5),
                allowNull: true
            },
            ville: {
                type: Sequelize.DataTypes.STRING(150),
                allowNull: true
            },
            email: {
                type: Sequelize.DataTypes.STRING(150),
                allowNull: false
            },
            password: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true
            },
            confirm_password: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true
            },
            personne: {
                type: Sequelize.DataTypes.TINYINT(1),
                allowNull: true
            },
            petit_dej: {
                type: Sequelize.DataTypes.TINYINT(1),
                allowNull: true
            },
            dej: {
                type: Sequelize.DataTypes.TINYINT(1),
                allowNull: true
            },
            diner: {
                type: Sequelize.DataTypes.TINYINT(1),
                allowNull: true
            },



            forget: {
                type: Sequelize.DataTypes.STRING(60),
                allow: true
            },

        }, {
            timestamps: true,
            underscored: true
        }
    );
};