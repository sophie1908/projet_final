var express = require("express");
var router = express.Router();
var db = require("../database/db");


router.get("/rec_pref", (req, res) => {
    db.pref_alimentaire.findAll()
        .then((pref) => {
            res.json({
                pref: pref
            })
        }).catch((err) => {
            res.json(err)
        })
});

module.exports = router;