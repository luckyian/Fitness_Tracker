const db = require("./models");
const router = require("express").Router();
// const databaseUrl = "exercise";
// const collections = ["exercise"];

// const db = mongojs(databaseUrl, collections);

db.on("error", error => {
    console.log("Database Error:", error);
});
router.get("/", (req, res) => {
    res.send(index.html);
});



// Saves an exercise to the database's collection
// POST: /submit
// ===========================================
router.post("api/submit", (req, res) => {
    db.Exercise.insert(req.body, (err, saved) => {
        if (err) {
            console.log(err);
        } else {
            res.json(saved);
        }
    });
});
// Retrieves all exercises from the database's collection
// GET: /all
// ====================================================
router.get("api/all", (req, res) => {
    db.Exercise.find({}, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});
// 3. Retrieves one exercise in the database's collection by it's ObjectId
// GET: /find/:id
// ==================================================================
router.get("api/find/:id", (req, res) => {
    const id = req.params.id

    db.Exercise.find(
        _id = mongojs.ObjectId(id), (err, found) => {
            if (err) {
                console.log(err);
            } else {
                res.json(found);
            }
        }

    );

});
// 4. Updates one exercise in the database's collection by it's ObjectId
// POST: /update/:id
// ================================================================
router.update("api/update/:id", (req, res) => {
    db.Exercise.insert(
        { _id=mongojs.ObjectId(req.params.id) }, { req.params}, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});
// 5. Deletes one exercise from the database's collection by it's ObjectId
// DELETE: /delete/:id
// ==================================================================
router.delete("api/delete/:id", (req, res) => {
    db.Exercise.remove({ _id=mongojs.ObjectId(req.id) }, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});
// 6. Clear the entire exercise collection
// DELETE: /clearall
// ===================================
router.delete("api/clearall", (req, res) => {
    db.Exercise.remove({}, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});

module.exports = router;