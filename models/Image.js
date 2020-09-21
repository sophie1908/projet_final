module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "image", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nom: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true
            }

        }, {
            timestamps: true,
            underscored: true
        }
    );
};