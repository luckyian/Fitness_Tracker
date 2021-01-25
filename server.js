const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "workout";
const collections = ["workouts"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
  console.log("Database Error:", error);
});

app.get("/", (req, res) => {
  res.send(index.html);
});



// Saves a note to the database's collection
// POST: /submit
// ===========================================
app.post("/submit", (req, res) => {
  db.notes.insert(req.body, (err, saved) => {
    if (err) {
      console.log(err);
    } else {
      res.json(saved);
    }
  });
});
// Retrieves all notes from the database's collection
// GET: /all
// ====================================================
app.get("/all", (req, res) => {
  db.notes.find({}, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});
// 3. Retrieves one note in the database's collection by it's ObjectId
// GET: /find/:id
// ==================================================================
app.get("/find/:id", (req, res) => {
  const id = req.params.id
  
  db.notes.find(
    _id = mongojs.ObjectId(id), (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});
// 4. Updates one note in the database's collection by it's ObjectId
// POST: /update/:id
// ================================================================
app.update("/update/:id", (req, res) => {
  db.notes.insert({mongojs.ObjectId(req.params.id)}, {req.params}, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});
// 5. Deletes one note from the database's collection by it's ObjectId
// DELETE: /delete/:id
// ==================================================================
app.delete("/delete/:id", (req, res) => {
  db.notes.remove({mongojs.ObjectId(req.id)}, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});
// 6. Clear the entire note collection
// DELETE: /clearall
// ===================================
app.delete("/clearall", (req, res) => {
  db.notes.remove({}, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});