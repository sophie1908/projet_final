module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "liste_recette", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            numero: {
                type: Sequelize.DataTypes.INTEGER,
            },


        }, {
            timestamps: true,
            underscored: true
        }
    );
};