const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

const config = require("./config/config");

const booksRouter = require("./routes/books");
const usersRouter = require("./routes/users");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true
}));

app.use("/books", booksRouter);
app.use("/users", usersRouter);

app.use(express.static("public"));

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});