const Express = require("express"),
    router = Express.Router(),
    db = require("../database/db");
const { Op } = require("sequelize");





router.post("/new_recette", (req, res) => {

    var idmateriel = req.body.materiel;
    var idingredient = req.body.ingredient;
    var quantite = req.body.quantite

    db.recette.findOne({
            where: { nom: req.body.nom }
        })
        .then(recette => {
            if (!recette) {
                db.recette
                    .create({
                        nom: req.body.nom,
                        temps: req.body.temps,
                        cout_pers: req.body.cout_pers,
                        pdf: req.body.pdf,
                        image: req.body.image,
                        cat_recetteId: req.body.cat_recette
                    })
                    .then((recette) => {
                        console.log(recette);
                        recette
                            .addMateriels(idmateriel)
                            .then((recettes) => {
                                recette
                                    .addIngredients(idingredient, { through: { quantite: quantite } })
                                    .then((recettes) => {
                                        res.json(recettes);
                                    })
                                    .catch((err) => {
                                        res.json(err);
                                    })
                            })

                        .catch((err) => {
                            res.json(err);
                        })

                    })

            } else {
                res.json(" déja dans la base ");
            }
        })

    .catch((err) => {
            res.json(err);
            console.log(err)
        })
        .catch((err) => {
            res.json(err);
            console.log(err)
        })
});

router.get("/all_recette", (req, res) => {
    db.recette
        .findAll({
            include: { all: true },
        })
        .then((recette) => {
            if (recette) {
                res.status(200).json({
                    recette: recette,
                });
            } else {
                res.json("il n'y a pas de recettes");

            }
        })
        .catch(err => {
            res.json(err);
        });
});
router.get("/recette_cat/:id", (req, res) => {
    db.cat_recette
        .findOne({
            where: { id: req.params.id },
            include: { all: true },
        })
        .then((cat_recette) => {
            if (cat_recette) {
                res.status(200).json({
                    cat_recette: cat_recette,
                });
            } else {
                res.json("il n'y a pas de cat_recettes");

            }
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/findBylike/:nom", (req, res) => {
    db.recette.findAll({
            where: {
                nom: {
                    [Op.like]: '%' + req.params.nom + '%'
                }
            },
        })
        .then(recette => {
            res.status(200).json({ recette: recette })
        })
        .catch(err => {
            res.json(err);
        })
});
router.get("/rec_recette/:id", (req, res) => {
    db.recette
        .findOne({
            where: { id: req.params.id },
            include: { all: true },

        })
        .then((recette) => {
            res.status(200).json({ recette: recette });
        })
        .catch((err) => {
            res.json("test error" + err);
        });
});



module.exports = router;