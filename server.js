var express = require("express");

var fs = require("fs")
var path = require("path")
var app = express();
var PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const jsonArr = require("./db/db.json")

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", function (req, res) {
    // var json = getJson();
    return res.json(jsonArr);
})

app.post("/api/notes", function (req, res) {
    console.log("adding new note")

    const randomId = Math.floor(Math.random() * 100)

    const newNote = {
        id: randomId,
        title: req.body.title,
        text: req.body.title
    }
    jsonArr.push(newNote);
    return jsonArr
})

app.delete("/api/notes/:id", function (req, res) {
    console.log("deleting note")
    for (var i = 0; i < jsonArr.length; i++) {
        if (req.params.id == jsonArr[i].id) {
            jsonArr.splice(i, 1);
            return jsonArr
        }
        console.log(req.params.id)
        console.log(jsonArr[i].id)
    }
    console.log(jsonArr)

})


app.listen(PORT, function () {
    console.log("Server is listening on LocalHost " + PORT)
})