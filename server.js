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

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", function (req, res) {
    var json = getJson();
    res.json(json);
})

app.post("/api/notes", function (req, res) {
    console.log("adding new note")
    addNote(req.body);
    res.json(getJson());
})

app.delete("/api/notes/:id", function (req, res) {
    deleteNote(req.params.id);
    res.json(getJson())
})

function getJson() {
    var read = fs.readFileSync(path.join(__dirname, "/db/db.json"));
    var json = JSON.parse(read);
    return json;
}

function writeNote(data) {
    var object = {
        id: data.id,
        title: data.title,
        text: data.text,
        complete: false,
        hidden: false
    }
    return object;
}

function saveData(data) {
    var stringData = JSON.stringify(data);
    fs.watchFileSync(__dirname, "/db/db.json", stringData)

}


function addNote(note) {
    var json = getJson();
    var newNote = writeNote(note);
    json.push(newNote);
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