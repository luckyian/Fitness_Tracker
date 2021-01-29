app.get("/", (req, res) => {
    res.send(index.html);
});



// Saves a workout to the database's collection
// POST: /submit
// ===========================================
app.post("api/submit", (req, res) => {
    db.workouts.insert(req.body, (err, saved) => {
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
app.get("api/all", (req, res) => {
    db.workouts.find({}, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});
// 3. Retrieves one workout in the database's collection by it's ObjectId
// GET: /find/:id
// ==================================================================
app.get("api/find/:id", (req, res) => {
    const id = req.params.id

    db.workouts.find(
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
app.update("api/update/:id", (req, res) => {
    db.workouts.insert(
        { _id=mongojs.ObjectId(req.params.id) }, { req.params}, (err, found) => {
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
app.delete("api/delete/:id", (req, res) => {
    db.workouts.remove({ _id=mongojs.ObjectId(req.id) }, (err, found) => {
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
app.delete("api/clearall", (req, res) => {
    db.workouts.remove({}, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});