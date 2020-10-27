/**
 * ExpressJS est une librairie qui permet de créer 
 * une application Web plus simplement qu'avec l'objet http directement.
 */
const express = require("express");
// body-parser : un paquet permettant de lire les données JSON envoyées à notre serveur.
const bodyparser = require("body-parser");
//  CORS est un mécanisme de sécurité qui bloque certaines requêtes non autorisées à votre serveur Web.
const cors = require("cors");

const port = 3000;
const hostname = "localhost";

const app = express();

app.use(cors());

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: false }));

app.use("/user", require('./router/user'));
app.use("/pref_alimentaire", require('./router/pref_alimentaire'));


app.listen(port, () => {
    console.log(`It's ok darling http://${hostname}:${port}`);
});