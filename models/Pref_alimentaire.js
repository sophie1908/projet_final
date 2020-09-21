module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "pref_alimentaire", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: {
                type: Sequelize.DataTypes.TINYINT(1),
                allowNull: false
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