// Sequelize est un ORM
// ORM : Un mapping objet-relationnel
// est un type de programme informatique qui se place en interface entre un programme applicatif
// et une base de données relationnelle pour simuler une base de données orientée objet.
const Sequelize = require("sequelize");

const db = {};

const dbinfo = new Sequelize("cook", "root", "", {
    host: "localhost",
    dialect: "mysql",
    port: 3308,
    pool: {
        max: 5,
        min: 0,
    },
});

dbinfo
    .authenticate()
    .then(() => {
        console.log("Connecté");
    })
    .catch((err) => {
        console.error("non connecté", err);
    });



db.avoir = require("../models/Avoir")(dbinfo, Sequelize);
db.cat_ingredient = require("../models/Cat_ingredient")(dbinfo, Sequelize);
db.cat_recette = require("../models/Cat_recette")(dbinfo, Sequelize);
db.choisir = require("../models/Choisir")(dbinfo, Sequelize);
db.composer = require("../models/Composer")(dbinfo, Sequelize);
db.contenir = require("../models/Contenir")(dbinfo, Sequelize);
db.inclure = require("../models/Inclure")(dbinfo, Sequelize);
db.ingredient = require("../models/Ingredient")(dbinfo, Sequelize);
db.liste_course = require("../models/Liste_course")(dbinfo, Sequelize);
db.liste_recette = require("../models/Liste_recette")(dbinfo, Sequelize);
db.lister = require("../models/Lister")(dbinfo, Sequelize);
db.materiel = require("../models/Materiel")(dbinfo, Sequelize);
db.prix_ingredient = require("../models/Prix_ingredient")(dbinfo, Sequelize);
db.recette = require("../models/Recette")(dbinfo, Sequelize);
db.requier = require("../models/Requier")(dbinfo, Sequelize);
db.user = require("../models/User")(dbinfo, Sequelize);


/*
 * Les quatre types d’associations disponibles en Sequelize
 *
 * BelongsTo     : les associations sont des associations où la clé étrangère
 * pour la relation 1-à-1 existe sur le modèle source.
 *
 * HasOne        : les associations sont des associations où la clé étrangère
 * pour la relation 1-à-1 existe sur le modèle cible.
 *
 * HasMany       : les associations connectent une source avec plusieurs cibles.
 * Cependant, les cibles sont à nouveau connectées à une source spécifique.
 *
 * BelongsToMany : les associations sont utilisées pour connecter des sources
 * avec plusieurs cibles. En outre, les cibles peuvent également avoir des
 * connexions vers plusieurs sources.
 */

db.user.belongsToMany(db.cat_recette, {
    through: "choisir",
    foreignKey: "userId",
});
db.cat_recette.belongsToMany(db.user, {
    through: "choisir",
    foreignKey: "cat_recetteId",
});

db.user.belongsToMany(db.materiel, {
    through: "posseder",
    foreignKey: "userId",
});
db.materiel.belongsToMany(db.user, {
    through: "posseder",
    foreignKey: "materielId",
});



db.liste_course.hasMany(db.user, { foreignKey: "userId" });
db.liste_recette.hasMany(db.user, { foreignKey: "userId" });

db.recette.belongsToMany(db.liste_recette, {
    through: "composer",
    foreignKey: "recetteId",
});
db.liste_recette.belongsToMany(db.recette, {
    through: "composer",
    foreignKey: "liste_recetteId",
});

db.cat_recette.hasMany(db.recette, { foreignKey: "cat_recetteId" });
db.cat_ingredient.hasMany(db.ingredient, { foreignKey: "cat_ingredientId" });
db.prix_ingredient.hasMany(db.ingredient, { foreignKey: "prix_ingredientId" });


db.recette.belongsToMany(db.materiel, {
    through: "utilisers",
    foreignKey: "recetteId",
});
db.materiel.belongsToMany(db.recette, {
    through: "utilisers",
    foreignKey: "materielId",
});

db.recette.belongsToMany(db.ingredient, {
    through: "contenir",
    foreignKey: "recetteId",
});
db.ingredient.belongsToMany(db.recette, {
    through: "contenir",
    foreignKey: "ingredientId",
});

db.liste_course.belongsToMany(db.ingredient, {
    through: "lister",
    foreignKey: "liste_courseId",
});
db.ingredient.belongsToMany(db.liste_course, {
    through: "lister",
    foreignKey: "ingredientId",
});

db.dbinfo = dbinfo;
db.Sequelize = Sequelize;

//dbinfo.sync({ force: true });

module.exports = db;