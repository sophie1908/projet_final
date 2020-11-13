const Express = require("express"),
    router = Express.Router(),
    db = require("../database/db");


router.post("/new_ingredient", (req, res) => {

    db.ingredient.findOne({
            where: { nom: req.body.nom }
        })
        .then(ingredient => {
            if (!ingredient) {
                db.ingredient
                    .create({
                        nom: req.body.nom,
                        image: req.body.image,
                        unite: req.body.unite,
                        quantite: req.body.quantite,
                        prix: req.body.prix,
                        cat_ingredientId: req.body.cat_ingredient

                    })
                    .then((ingredient) => {
                        console.log(ingredient);
                        res.json(ingredient)

                    })
                    .catch((err) => {
                        res.json(err);
                    })
            } else {
                res.json(" ingrédient déja dans la base ");
            }
        })
        .catch((err) => {
            res.json(err);
        })
});

router.get("/rec_ingredient", (req, res) => {
    db.ingredient.findAll()
        .then((ingredient) => {
            res.json({
                ingredient: ingredient
            })
        }).catch((err) => {
            res.json(err)
        })
});

module.exports = router;