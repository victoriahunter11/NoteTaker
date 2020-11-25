// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Routes
// =============================================================

app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", function(err,data) {
        if (err) throw err;
        res.json(JSON.parse(data));
    })
});

app.post("/api/notes", function(req, res) {
    console.log('req', req.body);
    fs.readFile("./db/db.json", function(err, data) {
        if (err) throw err;
       var jsonData = JSON.parse(data);
       console.log('jsonData1',jsonData);
       jsonData.push(req.body);
       console.log('jsonData2',jsonData);
       fs.writeFile("./db/db.json", JSON.stringify(jsonData) , function(err, data) {
           if (err) throw err;
           res.json(jsonData);
       })
    })

})

// app.delete("/api/notes/:id", function (req, res) {
//     console.log('req', req.body);

// })

app.get("/notes", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });
  
  // Basic route that sends the user first to the AJAX Page
app.get("*", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
