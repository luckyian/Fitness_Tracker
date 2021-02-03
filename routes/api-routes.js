const db = require("../models");
const router = require("express").Router();
const mongojs = require("mongojs");
// const databaseUrl = "workout";
// const collections = ["workout"];

// const db = mongojs(databaseUrl, collections);

// db.on("error", error => {
//     console.log("Database Error:", error);
// });

router.get("/", (req, res) => {
    res.send(index.html);
});



// Saves an workout to the database's collection
// ===========================================
router.post("/api/workouts", (req, res) => {
    db.workout.insert(req.body, (err, saved) => {
        if (err) {
            console.log(err);
        } else {
            res.json(saved);
        }
    });
});
// Retrieves all workouts from the database's collection
// GET: /all
// ====================================================
router.get("/api/workouts", (req, res) => {
    db.collection('workout').aggregate
    // db.workout.aggregate
    ([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
            }
        }

    ]).then((dbWorkouts) => { res.json(dbWorkouts); })
        .catch((err) => { res.json(err); });
});
// 3. Retrieves one workout in the database's collection by it's ObjectId
// GET: /find/:id
// ==================================================================
router.get("/api/workouts/:id", (req, res) => {
    const id = req.params.id

    db.workout.find(
        _id = mongojs.ObjectId(id), (err, found) => {
            if (err) {
                console.log(err);
            } else {
                res.json(found);
            }
        }

    );

});
// 4. Updates one workout in the database's collection by it's ObjectId
// POST: /update/:id
// ================================================================
router.put("/api/workouts/:id", (req, res) => {
    const id = req.params.id
    db.workout.findByOneAndUpdate
        (_id = mongojs.ObjectId(id),
            { $push: { exercises: req.body } }, (err, found) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(found);
                }

            });

});
// 5. Deletes one workout from the database's collection by it's ObjectId
// DELETE: /delete/:id
// ==================================================================
router.delete("/api/workouts/:id", (req, res) => {
    db.workout.remove(_id=mongojs.ObjectId(req.id) , (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});
// 6. Clear the entire workout collection
// DELETE: /clearall
// ===================================
router.delete("/api/workouts/", (req, res) => {
    db.workout.remove({}, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});

router.get("/api/workouts/range", (req, res) => {

    db.workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
            }
        }

    ])
        .limit(7)
        .sort({ _id: -1 })
        .then((dbWorkouts) => { res.json(dbWorkouts); })
        .catch((err) => { res.json(err); });
});

module.exports = router;