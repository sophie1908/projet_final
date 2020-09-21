module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "parametre", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            jour: {
                type: Sequelize.DataTypes.TINYINT(1),
                allowNull: false
            },
            repas: {
                type: Sequelize.DataTypes.TINYINT(1),
                allowNull: false
            },
            temps: {
                type: Sequelize.DataTypes.TINYINT(2),
                allowNull: false
            },
            adulte: {
                type: Sequelize.DataTypes.TINYINT(1),
                allowNull: true
            },
            enfant: {
                type: Sequelize.DataTypes.TINYINT(1),
                allowNull: true
            },
            budget_semaine: {
                type: Sequelize.DataTypes.DECIMAL(5),
                allowNull: true
            },


        }, {
            timestamps: true,
            underscored: true
        }
    );
};