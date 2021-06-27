let mysql = require("mysql");
const { connect } = require("../routes/user");

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// View Users
exports.view = (req, res) => {
  connection.query(
    "SELECT * FROM user  WHERE status = 'active'",
    (err, rows) => {
      // When done with the connection, release it

      if (!err) {
        let removedUser = req.query.removed;
        res.render("home", { rows, removedUser });
      } else {
        console.log(err);
      }
      //console.log("The data from user table: \n", rows);
    }
  );
};

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  connection.query(
    "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?",
    ["%" + searchTerm + "%", "%" + searchTerm + "%"],
    (err, rows) => {
      if (!err) {
        res.render("home", { rows });
      } else {
        console.log(err);
      }
      console.log("Getting Data");
    }
  );
};

exports.form = (req, res) => {
  res.render("adduser");
};

//Add new student
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;

  connection.query(
    "INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? ",
    [first_name, last_name, email, phone, comments],
    (err, rows) => {
      if (!err) {
        res.render("adduser", { alert: "User added successfully" });
      } else {
        console.log(err);
      }
      console.log("new user added");
    }
  );
};

// Edit user
exports.edit = (req, res) => {
  // User the connection
  connection.query(
    "SELECT * FROM user WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (!err) {
        res.render("edit-user", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    }
  );
};

//Update user

exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  connection.query(
    "UPDATE user SET first_name= ? , last_name = ?, email = ?, phone = ?, comments = ? WHERE id=?",
    [first_name, last_name, email, phone, comments, req.params.id],
    (err, rows) => {
      if (!err) {
        // User the connection
        connection.query(
          "SELECT * FROM user WHERE id = ?",
          [req.params.id],
          (err, rows) => {
            // When done with the connection, release it
            if (!err) {
              res.render("edit-user", {
                rows,
                alert: `${first_name} has been updated.`,
              });
            } else {
              console.log(err);
            }
            console.log("The data from user table: \n", rows);
          }
        );
      } else {
        console.log(err);
      }
      //console.log("The data from user table: \n", rows);
    }
  );
};

//DELETE  -one way of doing it
// exports.delete = (req, res) => {
//   connection.query(
//     "DELETE FROM user WHERE id = ? ",
//     [req.params.id],
//     (err, rows) => {
//       console.log(rows);
//       if (!err) {
//         res.redirect("/");
//       } else {
//         console.log(err);
//       }
//     }
//   );
// };

//DELETE - update the status and delete it later
exports.delete = (req, res) => {
  connection.query(
    "UPDATE user SET status = ? Where id = ?",
    ["removed", req.params.id],
    (err, rows) => {
      if (!err) {
        let removedUser = encodeURIComponent("User successful");
        res.redirect("/?removed=" + removedUser);
      } else {
        console.log(err);
      }
    }
  );
};

//View all
exports.viewall = (req, res) => {
  connection.query(
    "SELECT * FROM user WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (!err) {
        res.render("view-user", { rows });
      } else {
        console.log(err);
      }
    }
  );
};
