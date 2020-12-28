/**
 * ExpressJS est une librairie qui permet de créer
 * une application Web plus simplement qu'avec l'objet http directement.
 */
const express = require("express");
// body-parser : un paquet permettant de lire les données JSON envoyées à notre serveur.
const bodyparser = require("body-parser");
//  CORS est un mécanisme de sécurité qui bloque certaines requêtes non autorisées à votre serveur Web.
const cors = require("cors");
//Le port sur lequel vous pouvez appeler pour utiliser votre server en local
//Prend le premier port libre, la priorité sera a celui qui est libre en premier ( en node.js 3000 est le port par default)
const port = 3000;
const hostname = "localhost";

const app = express();

app.use(cors());

app.use(bodyparser.json());
//la valeur  peut être en string ou en objet
//Si extended est true, vous pouvez faire ce que vous voulez
//urlencoded est un mécanisme de codage de l'information dans un Uniform Resource Identifier(URI)
//
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/user", require("./router/user"));
app.use("/materiel", require("./router/materiel"));
app.use("/recette", require("./router/recette"));
app.use("/ingredient", require("./router/ingredient"));

app.listen(port, () => {
    console.log(`It's ok darling http://${hostname}:${port}`);
});