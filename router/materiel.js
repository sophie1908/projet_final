var express = require("express");
var router = express.Router();
var db = require("../database/db");


router.get("/rec_materiel", (req, res) => {
    db.materiel.findAll({
        include: { all: true },
    })

    .then((materiel) => {
        res.json({
            materiel: materiel
        })
    }).catch((err) => {
        res.json(err)
    })
});

module.exports = router;