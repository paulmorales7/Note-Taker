var express = require("express");

var fs = require("fs")
var path = require("path")
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

app.get("*", function (req, res) {
    res.sendFile(__dirname, "/public/index.html")
})

app.get("/notes", function (req, res) {
    res.sendFile(__dirname, "/public/notes.html")
    var json = getJson();
    res.json(json);
})

app.get("/public/notes", function (req, res) {
    var json = getJson();
    res.json(json);
})

app.post("/public/notes", function (req, res) {
    writeNote(req.body);
    res.json(getJson());
})

app.delete("/public/notes/:id", function (req, res) {
    deleteNote(req.params.id);
    res.json(getJson())
})

function getJson() {
    var read = fs.readFileSync(path.join(__dirname, "/db/db.json"));
    var json = JSON.parse(read);
    return json;
}

function writeNote(data) {
    var note = {
        title: data.title,
        text: data.text,

    }
    return note;
}

function saveData(data) {
    var stringData = JSON.stringify(stringData);
    fs.watchFileSync(__dirname, "/db/db.json", data)
}
var jsonArr = [];

function addNote(note) {
    var json = getJson();
    var newNote = writeNote(note);
    jsonArr.push(newNote);
    savaData(json);
}

function deleteNote(id) {
    var json = getJson();
    json[id].hide = true;
    saveData[json];
}


app.listen(PORT, function () {
    console.log("Server is listening on LocalHost " + PORT)
})