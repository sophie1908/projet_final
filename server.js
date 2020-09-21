const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const port = 3000;
const hostname = "localhost";

const app = express();

app.use(cors());

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: false }));

app.use("/user", require('./router/user'));

app.listen(port, () => {
    console.log(`It's ok darling http://${hostname}:${port}`);
});