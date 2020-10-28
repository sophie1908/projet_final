// Sequelize est un ORM
// ORM : Un mapping objet-relationnel
// est un type de programme informatique qui se place en interface entre un programme applicatif
// et une base de données relationnelle pour simuler une base de données orientée objet.
const Sequelize = require("sequelize");

const db = {};

const dbinfo = new Sequelize("cook", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
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

db.abonnement = require("../models/Abonnement")(dbinfo, Sequelize);
db.allergene = require("../models/Allergene")(dbinfo, Sequelize);
db.avoir = require("../models/Avoir")(dbinfo, Sequelize);
db.cat_ingredient = require("../models/Cat_ingredient")(dbinfo, Sequelize);
db.cat_recette = require("../models/Cat_recette")(dbinfo, Sequelize);
db.choisir = require("../models/Choisir")(dbinfo, Sequelize);
db.composer = require("../models/Composer")(dbinfo, Sequelize);
db.contenir = require("../models/Contenir")(dbinfo, Sequelize);
db.facture = require("../models/Facture")(dbinfo, Sequelize);
db.image = require("../models/Image")(dbinfo, Sequelize);
db.inclure = require("../models/Inclure")(dbinfo, Sequelize);
db.ingredient = require("../models/Ingredient")(dbinfo, Sequelize);
db.liste_course = require("../models/Liste_course")(dbinfo, Sequelize);
db.liste_recette = require("../models/Liste_recette")(dbinfo, Sequelize);
db.lister = require("../models/Lister")(dbinfo, Sequelize);
db.materiel = require("../models/Materiel")(dbinfo, Sequelize);
db.paiement = require("../models/Paiement")(dbinfo, Sequelize);
db.parametre = require("../models/Parametre")(dbinfo, Sequelize);
db.posseder = require("../models/Posseder")(dbinfo, Sequelize);
db.pref_alimentaire = require("../models/Pref_alimentaire")(dbinfo, Sequelize);
db.prix_ingredient = require("../models/Prix_ingredient")(dbinfo, Sequelize);
db.recette = require("../models/Recette")(dbinfo, Sequelize);
db.requier = require("../models/Requier")(dbinfo, Sequelize);
db.user = require("../models/User")(dbinfo, Sequelize);
db.utiliser = require("../models/Utiliser")(dbinfo, Sequelize);
db.fiche_recette = require("../models/Fiche_Recette")(dbinfo, Sequelize);

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

db.user.belongsToMany(db.pref_alimentaire, {
    through: "definir",
    foreignKey: "userId",
});
db.pref_alimentaire.belongsToMany(db.user, {
    through: "definir",
    foreignKey: "pref_alimentaireId",
});

db.user.belongsToMany(db.materiel, {
    through: "posseder",
    foreignKey: "userId",
});
db.materiel.belongsToMany(db.user, {
    through: "posseder",
    foreignKey: "materielId",
});

db.user.belongsToMany(db.allergene, { through: "avoir", foreignKey: "userId" });
db.allergene.belongsToMany(db.user, {
    through: "avoir",
    foreignKey: "allergeneId",
});

db.abonnement.hasOne(db.user, { foreignkey: "userId" });
db.paiement.hasOne(db.user, { foreignkey: "userId" });
db.fiche_recette.hasOne(db.recette, { foreignKey: "recetteId" });

db.liste_course.hasMany(db.user, { foreignKey: "userId" });
db.liste_recette.hasMany(db.user, { foreignKey: "userId" });

db.facture.hasOne(db.paiement, { foreignkey: "paiementId" });

db.recette.belongsToMany(db.liste_recette, {
    through: "composer",
    foreignKey: "recetteId",
});
db.liste_recette.belongsToMany(db.recette, {
    through: "composer",
    foreignKey: "liste_recetteId",
});

db.recette.hasMany(db.cat_recette, { foreignKey: "cat_recetteId" });
db.ingredient.hasMany(db.cat_ingredient, { foreignKey: "cat_ingredientId" });
db.ingredient.hasMany(db.prix_ingredient, { foreignKey: "prix_ingredientId" });

db.image.hasOne(db.recette, { foreignkey: "recetteId" });
db.image.hasOne(db.ingredient, { foreignkey: "ingredientId" });
db.image.hasOne(db.cat_recette, { foreignkey: "cat_recetteId" });
db.image.hasOne(db.cat_ingredient, { foreignkey: "cat_ingredientId" });

db.recette.belongsToMany(db.materiel, {
    through: "utiliser",
    foreignKey: "recetteId",
});
db.materiel.belongsToMany(db.recette, {
    through: "utiliser",
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

db.allergene.belongsToMany(db.ingredient, {
    through: "inclure",
    foreignKey: "allergeneId",
});
db.ingredient.belongsToMany(db.allergene, {
    through: "inclure",
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