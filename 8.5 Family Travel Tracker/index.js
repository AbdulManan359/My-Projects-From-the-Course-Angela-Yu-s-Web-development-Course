import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "myDatabase",
  password: "password",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

// let users = [
//   { id: 1, name: "Angela", color: "teal" },
//   { id: 2, name: "Jack", color: "powderblue" },
// ];

let users = [];

async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return users.find((user) => user.id === currentUserId);
};


async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id=$1", [currentUserId]);
  let countries = [];
  let u = result.rows;
  u.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
app.get("/", async (req, res) => {

  // To get the users information from the database.

  const currentUser = await getCurrentUser();
  const countries = await checkVisisted();

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  });


});

app.post("/user", async (req, res) => {
  if (req.body.add) {
    res.render("new.ejs");
  } else if (req.body.user) {
    const id = parseInt(req.body.user);
    currentUserId = id; //Updating the current user id before res.redirect("/")

    res.redirect("/");
  };


});



app.post("/add", async (req, res) => {
  const input = req.body["country"];
  console.log("This is req.body")
  console.log(req.body);

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code,user_id) VALUES ($1,$2)", [
        countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});




app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html

  let color = req.body.color;
  let name = req.body.name;
  console.log(name, color);
  if (color === undefined && name === undefined) {
    color = "green";
    name = "New Member";
  } else if (color === undefined) {
    color = "green";

  } else if (name === undefined) {
    name = "New Member";

  }

  const sqlColorNameInput = `INSERT INTO users (name,color) VALUES ('${name}','${color}') RETURNING *;`;

  try {
    const result = await db.query(sqlColorNameInput);
    currentUserId = result.rows[0].id; //Here, we are updating the the current user_id before makeing a get request to the homepage.

    res.redirect("/");

    // const v = await getCurrentUser();
    // let countries = await checkVisisted();
    // console.log(countries);


    // res.render("index.ejs", {
    //   countries: countries,
    //   total: countries.length,
    //   users: users,
    //   color: n,
    // });
  }
  catch (err) {
    console.log("Sorry! There is an error occur in fetching data into the database.", err);
    res.send("Sorry! There is an error occur in fetching data into the database.", err);
  }



});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


