const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DateSchema = new Schema({
day: {
    type: Date,
    default: Date.now
}
});

const Date = mongoose.model("Date", DateSchema);

module.exports = Date;