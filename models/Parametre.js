module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "parametre", {
            petitdej: {
                type: Sequelize.DataTypes.TINYINT(1),
                allowNull: false
            },
            dej: {
                type: Sequelize.DataTypes.TINYINT(1),
                allowNull: false
            },
            diner: {
                type: Sequelize.DataTypes.TINYINT(1),
                allowNull: false
            },
            temps_ptidej: {
                type: Sequelize.DataTypes.TINYINT(2),
                allowNull: false
            },
            temps_dej: {
                type: Sequelize.DataTypes.TINYINT(2),
                allowNull: false
            },
            temps_diner: {
                type: Sequelize.DataTypes.TINYINT(2),
                allowNull: false
            },



        }, {
            timestamps: true,
            underscored: true
        }
    );
};