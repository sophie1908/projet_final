var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var db = require("../database/db");


process.env.SECRET_KEY = 'secret';

router.post('/register', (req, res) => {
    console.log(req.body);
    db.user.findOne({
            where: { email: req.body.email }
        })
        .then(user => {
            if (!user) {
                password = bcrypt.hashSync(req.body.password, 10);
                db.user.create({
                        nom: req.body.nom,
                        prenom: req.body.prenom,
                        date_de_naissance: req.body.date_de_naissance,
                        adresse: req.body.adresse,
                        complement_adresse: req.body.complement_adresse,
                        cp: req.body.cp,
                        ville: req.body.ville,
                        email: req.body.email,
                        password: password,
                        confirm_password: password,

                    })
                    .then(useritem => {
                        let token = jwt.sign(useritem.dataValues,
                            process.env.SECRET_KEY, {
                                expiresIn: 1440
                            });

                        res.status(200).json({ token: token })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            } else {
                res.json("utilisateur déja dans la base");
            }
        })
        .catch(err => {
            res.json({ error: err })
        })
});

router.put("/update/:id", (req, res) => {
    db.user.findOne({
            where: { id: req.params.id }
        })
        .then(user => {
            user.update(req.body)
                .then(useritem => {
                    res.status(200).json(useritem);
                })
                .catch(err => {
                    res.status(402).send("impossible de mettre à jour votre compte" + err);
                })
        })
});

router.post("/login", (req, res) => {
    db.user.findOne({
            where: { email: req.body.email }
        })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    });
                    res.status(200).json({ token: token })
                } else {
                    res.status(520).json("email ou password incorrect")
                }
            } else {
                return res.status(520).json("cette utilisateur n'existe pas")
            }
        })
        .catch(err => {
            res.json("test error" + err)
        })
});

module.exports = router;