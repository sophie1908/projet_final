module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "contenir", {

        }, {
            timestamps: true,
            underscored: true
        }
    );
};