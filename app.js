"use strict";

const express = require('express');
const app = express();
const multer = require('multer');
app.use(multer().none());

app.get('/posts', function (req, res) {
  res.type("text").send("Hello World");
});

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
const PORT = process.env.PORT || 8000;
app.listen(PORT);