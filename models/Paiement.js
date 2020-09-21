module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "paiement", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type_paiement: {
                type: Sequelize.DataTypes.TINYINT(1),
            },


        }, {
            timestamps: true,
            underscored: true
        }
    );
};