import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "password",
  port: 5432,
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
db.connect();

// let items = [];

// let items = [
//   { id: 1, title: "Buy milk" },
//   { id: 2, title: "Finish homework" },
// ];

app.get("/", async (req, res) => {

  const result = await db.query("SELECT * FROM items ORDER BY id ASC");
  const items = result.rows;
  console.log(items);


  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  let sqlCode = `INSERT INTO items(title) VALUES ('${item}')`;
  try {
    await db.query(sqlCode);
  } catch (err) {
    console.log("Sorry! There is an error in processing your request.");
    console.log(err);
    res.send("There is an error in processing your request.", err);
  }

  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const updatedTitle = req.body.updatedItemTitle;
  const id = parseInt(req.body.updatedItemId);

  const sqlCode = `UPDATE items SET title='${updatedTitle}' WHERE id=${id}`;

  try {
    await db.query(sqlCode);
  } catch (err) {
    console.log(err);
    res.send("There is an error occured in processing your request.", err);
  }

  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const id = parseInt(req.body.deleteItemId);

  const sqlCode = `DELETE FROM items WHERE id=${id}`;

  try {
    await db.query(sqlCode);
  } catch (err) {
    console.log(err);
    res.send("There is an error in processing your request.");
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
