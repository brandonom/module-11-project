const fs = require("fs");
const express = require("express");
const { getData, writeData, generateId } = require("./db");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.static("./public"));
app.use(express.json());

const dbPath = path.join(__dirname, "db.json");