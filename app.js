const express = require("express");
const exphbs = require("express-handlebars");

const mysql = require("mysql");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

//Parsing middleware
// Parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// Parse application/json
app.use(express.json());

//Setting static files
app.use(express.static("public"));

//Setup templating enjines
app.engine("hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", "hbs");

// Router

const routes = require("./server/routes/user");
app.use("/", routes);

app.listen(port, () => {
  console.log(`Linstinig on ${port}`);
});
