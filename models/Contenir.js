module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "contenir", {
            quantite: {
                type: Sequelize.DataTypes.INTEGER,
            },
        }, {
            timestamps: true,
            underscored: true
        }
    );
};