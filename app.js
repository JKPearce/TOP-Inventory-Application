const express = require("express");
const path = require("node:path");

const categoriesRouter = require("./routes/categoriesRouter");
const itemsRouter = require("./routes/itemsRouter");
const manufacturersRouter = require("./routes/manufacturersRouter");

const app = express();

// EJS setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Form data parsing
app.use(express.urlencoded({ extended: true }));

// Static files: CSS, images, etc.
app.use(express.static(path.join(__dirname, "public")));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Route files
app.use("/categories", categoriesRouter);
app.use("/items", itemsRouter);
app.use("/manufacturers", manufacturersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
