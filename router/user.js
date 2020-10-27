/* Node est le runtime qui permet d'écrire toutes nos tâches côté serveur,
 en JavaScript, telles que la logique métier, 
 la persistance des données et la sécurité. 
 Node ajoute également des fonctionnalités que le JavaScript du 
 navigateur standard ne possède pas, comme par exemple 
 l'accès au système de fichiers local. */



//Express.js est un framework pour construire des applications 
//web basées sur Node.js
var express = require("express");
//
var router = express.Router();
// fonction de hachage
var bcrypt = require("bcrypt");
//permet l'échange sécurisé de tokens entre plusieurs parties.
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
                if ((req.body.email != '') && (req.body.password != '')) {
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
                    res.json({ msg: "Mot de passe ou e-mail non renseigné" });
                }

            } else {
                res.json("Cette e-mail est déjà utilisé");
            }
        })
        .catch(err => {
            res.json({ error: err })
        })
});



router.post("/registerparam1", (req, res) => {
    console.log(req.body);
    db.user.findOne({
            where: { email: req.body.email }
        })
        .then(user => {
            user.update({
                    personne: req.body.personne,
                    petit_dej: req.body.petit_dej,
                    dej: req.body.dej,
                    diner: req.body.diner
                })
                .then(user => {
                    res.json(user)
                })
        })
        .catch(err => {
            res.json({ error: err })
        })
});

router.post("/registerparam1", (req, res) => {
    console.log(req.body);
    db.user.findOne({
            where: { email: req.body.email }
        })
        .then(user => {
            user.update({
                    personne: req.body.personne,
                    petit_dej: req.body.petit_dej,
                    dej: req.body.dej,
                    diner: req.body.diner
                })
                .then(user => {
                    res.json(user)
                })
        })
        .catch(err => {
            res.json({ error: err })
        })
});

router.post("/registerfinal", (req, res) => {
    console.log(req.body);
    var idpref = null;
    db.user.findOne({
            where: { email: req.body.email }
        })
        .then(user => {
            db.pref_alimentaire.findOne({
                    where: { nom: req.body.nom }
                })
                .then((pref) => {
                    idpref = pref.id;
                    user.addpref_alimentaire(idpref)
                        .then(user => {
                            res.json(user)
                        })
                })
                .catch(err => {
                    res.json({ error: err })
                })
        })

});




router.put("/update/:id", (req, res) => {
    db.user.findOne({
            where: { id: req.params.id }
        })
        .then(user => {
            user.update({
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    date_de_naissance: req.body.date_de_naissance,
                    adresse: req.body.adresse,
                    complement_adresse: req.body.complement_adresse,
                    cp: req.body.cp,
                    ville: req.body.ville,
                })
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

router.post("/envoimail", (req, res) => {
    var randtoken = require('rand-token');
    var token = randtoken.generate(16);
    db.user.findOne({
            where: { email: req.body.email }
        })
        /* utilisateur: va stocker dans  
        ( variable déclarer toute seule) ce qui va retrouver par rapport au findOne */
        /* => : fonction anonyme ( qui prend en parametre la variable utilisateur) */
        .then((user) => {
            console.log(user);
            /* si j'ai trouver l'utilisateur */
            if (user) {
                user.update({
                    /* stock le token temporaire dans la propriété forget de user */
                    forget: token
                }).then(item => {
                    /* déclare une constance nodemailer qui inclus le module nodemailer */
                    const nodemailer = require("nodemailer");
                    /* createTransport({}) : fonction predefini de 
                    nodemailer qui permet de créer un transporter */
                    const transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: '587',
                        /* authentification */
                        auth: {
                            user: "digitalweb117@gmail.com",
                            pass: "Pattedepie75",
                        },
                    });

                    const mailOptions = {
                        from: "digitalweb117@gmail.com",
                        to: item.email,
                        subject: "Mot de passe oublié",
                        text: "Réinitialiser votre mot de passe",
                        /* envoie du mail plus du token temporaire qui est stocké dans forget */
                        html: "<a href=http://localhost:8080/myreinitialiser/" + item.forget + ">clicker ici pour réinitialiser votre mot de passe</a>"
                    };
                    /* transporter: constante que j'ai 
                    déclaré au dessus qui contient le transporter */

                    /* transporter.sendMail : fonction de transporter qui 
                    permet d'envoyer le mail avec des options */

                    /* error, info : parametre qui recupere si il y a une erreur ou les infos */
                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            return res.send(error);

                        } else {
                            return res.send("Email sent : " + info.response);
                        }
                    });
                })
            }
        });
});
router.post("/updatepassword", (req, res) => {
    db.user.findOne({
            /* récupère le token temporaire qui est stocké dans le user.forget */
            where: { forget: req.body.forget }
        }).then(user => {
            if (user) {
                /* Créer deux constante afin de stocké password et confirm password afin de les comparer */
                const pwd = req.body.password;
                const confirmpwd = req.body.confirm_password;
                /* si les données des deux constantes sont identique */
                if (pwd === confirmpwd) {
                    /* stock dans la const hash le nouveau password et l'emcrypte 10 fois */
                    const hash = bcrypt.hashSync(req.body.password, 10);
                    /* stock en local dans body.password le nouveau password qui est stocker dans la const hash */
                    req.body.password = hash;
                    /* envoi dans la base de données */
                    user.update({
                            password: req.body.password,
                            forget: null,
                            confirm_password: null
                        })
                        .then(() => {
                            res.json({
                                message: "Mot de passe mis à jour"
                            })
                        })
                        .catch(err => {
                            res.json(err);
                        })
                } else {
                    res.json("Mot de passe différent")
                }
            } else {
                res.json("link not validé");
            }
        })
        .catch(err => {
            res.json(err)
        })
});

module.exports = router;