module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "prix_ingredient", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            unite: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: true
            },

            poids: {
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