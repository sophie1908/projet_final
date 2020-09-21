module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "cat_ingredient", {
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
                allowNull: false
            },

        }, {
            timestamps: true,
            underscored: true
        }
    );
};