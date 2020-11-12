module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "ingredient", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nom: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: true
            },
            image: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true
            },
            unite: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: true
            },

            quantite: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: true
            },
            prix: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: true
            },

        }, {
            timestamps: true,
            underscored: true
        }
    );
};