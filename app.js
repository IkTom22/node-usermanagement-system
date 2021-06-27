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

// Connection Pool
const connection = mysql.createConnection({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
//Connect to DB
// pool.getConnection((err, connection) => {
//   if (err) throw err; // not connected
//   console.log("Connected as ID" + connection.threadId);
// });
connection.connect((err, connection) => {
  if (err) {
    console.log(err.message);
  }
  console.log("db connected");
});

// Router
app.get("", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Linstinig on ${port}`);
});
