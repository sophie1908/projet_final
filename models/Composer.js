module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "composer", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }

        }, {
            timestamps: true,
            underscored: true
        }
    );
};