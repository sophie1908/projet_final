module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "recette", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nom: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: true
            },

            temps: {
                type: Sequelize.DataTypes.TIME,
                allowNull: true
            },

            niveau_cuisine: {
                type: Sequelize.DataTypes.TINYINT(1),
                allowNull: true
            },

            cout_pers: {
                type: Sequelize.DataTypes.DECIMAL(5),
                allowNull: false
            },

            pdf: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false
            }


        }, {
            timestamps: true,
            underscored: true
        }
    );
};