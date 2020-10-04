var noteData = require("../data/notesData");




module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        res.json(noteData);
    })




}