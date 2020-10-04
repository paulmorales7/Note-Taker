var path = require("path");
const notesArr = require("../data/notesData");

module.exports = function (app) {

    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.post("/api/notes/", function (req, res) {
        notesArr.push(req.body);
        res.json(true);
    })
};