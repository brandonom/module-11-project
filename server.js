const fs = require("fs");
const express = require("express");
const { getData, writeData, generateId } = require("./db");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.static("./public"));
app.use(express.json());

const dbPath = path.join(__dirname, "db.json");

app.get("/api/notes", function (req, res) {
    getData()
      .then((notes) => {
        res.json(notes);
      })
      .catch((err) => {
        console.error("Error getting data:", err);
        res.status(500).send("Internal Server Error");
      });
  });

  app.post("/api/notes", function (req, res) {
    getData()
      .then((noteData) => {
        const newNote = {
          id: generateId(),
          title: req.body.title,
          text: req.body.text,
        };
  
        noteData.push(newNote);
        writeData(noteData);
  
        res.json({ message: "Database Updated" });
      })
      .catch((err) => {
        console.error("Error getting data:", err);
        res.status(500).send("Internal Server Error");
      });
  });

  app.delete("/api/notes/:id", function (req, res) {
    getData()
      .then((notes) => {
        const noteId = req.params.id;
        const noteIndex = notes.findIndex((note) => note.id === noteId);
  
        if (noteIndex !== -1) {
          notes.splice(noteIndex, 1);
          writeData(notes);
          res.json({ message: "Database Updated" });
        } else {
          res.json({ error: "Note was not found" });
        }
      })
      .catch((err) => {
        console.error("Error getting data:", err);
        res.status(500).send("Internal Server Error");
      });
  });

  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"), function (err) {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("File sent successfully");
      }
    });
  });

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"), function (err) {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("File sent successfully");
      }
    });
  });
  
  app.listen(PORT, function () {
    console.log(`Server listening on PORT ${PORT}`);
  });