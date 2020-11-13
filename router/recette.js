const Express = require("express"),
    router = Express.Router(),
    db = require("../database/db");

router.post("/new_recette", (req, res) => {

    var idmateriel = req.body.materiel;
    var idingredient = req.body.ingredient;

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
                                    .addIngredients(idingredient)
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



module.exports = router;