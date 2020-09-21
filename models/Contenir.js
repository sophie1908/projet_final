module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "contenir", {
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