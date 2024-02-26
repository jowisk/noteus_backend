const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require('dotenv').config()

const notesRouter = require('./routes/notes')
const authRouter = require('./routes/auth')

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors("https://localhost:5173"));

app.use("/notes", notesRouter);
app.use("/auth", authRouter);


app.listen(4000, () => {
  console.log("Server is running on port 4000");
});