module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "avoir", {


        }, {
            timestamps: true,
            underscored: true
        }
    );
};