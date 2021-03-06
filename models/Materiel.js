module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "materiel", {
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
                type: Sequelize.DataTypes.STRING(60),
                allowNull: false
            },

        }, {
            timestamps: true,
            underscored: true
        }
    );
};