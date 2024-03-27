const express = require ("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/login', (req, res) => {
    const { name, password } = req.body;
  
    // Query the database to check if the provided username and password match any user
    const sql = "SELECT * FROM login WHERE name = ? AND password = ?";
    db.query(sql, [name, password], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      if (result.length > 0) {
        // If a user with matching credentials is found, return success
        return res.status(200).json("Success");
      } else {
        // If no matching user is found, return failure
        return res.status(401).json("Failure");
      }
    });
  });

  app.get('/login', (req, res) => {
    const sql = "SELECT * FROM login";
    db.query(sql, (err, data) => {
        if(err){
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.status(200).json(data);
    })
});

// PUT endpoint to update a user's details
app.put('/login/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  const sql = "UPDATE login SET name = ?, email = ?, password = ? WHERE id = ?";
  db.query(sql, [name, email, password, id], (err, data) => {
      if(err){
          return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(200).json("User updated successfully");
  })
});

// DELETE endpoint to delete a user
app.delete('/login/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM login WHERE id = ?";
  db.query(sql, id, (err, data) => {
      if(err){
          return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(200).json("User deleted successfully");
  })
});

app.listen(8081, () => {
    console.log("listening...");
})