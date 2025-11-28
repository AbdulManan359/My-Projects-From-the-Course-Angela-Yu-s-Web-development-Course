import express from "express";
import bodyParser from "body-parser";
import pg, { Result } from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "myDatabase",
  password: "password",
  port: 5432,
});



const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function findCountryCode() {
  const result = await db.query("SELECT * FROM visited_countries");

  let u = result.rows

  let countries = [];
  for (let i = 0; i < u.length; i++) {
    countries.push(u[i].country_code);
  }

  console.log("Country Codes are: ", countries);
  return countries;
}



await db.connect();
app.get("/", async (req, res) => {
  //Write your code here.

  let countries = await findCountryCode();



  res.render("index.ejs", {
    total: countries.length,
    countries: countries
  });


  // db.end();
  // In this case by using db.end(), It is showing this error:
  // Error: Client was closed and is not queryable
});


app.post("/add", async (req, res) => {
  let name = req.body.country;
  console.log("The name of the country is: ", name);

  // To get the required country code
  let sqlCode1 = `SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%${name.toLowerCase()}%'`;
  const checkCountryCode = await db.query(sqlCode1);



  // To Update the database with the input country code.

  // Error Handling in this code is remaining.
  if (checkCountryCode.rows.length !== 0) { //if the data found has the length 0 then it means the country user is searching for does not exist.

    let inputCountryCode = checkCountryCode.rows[0].country_code; //if we let it outside the if statement then an undefined error will be shown since rows[0] does not exist.

    let result = await db.query("SELECT country_code FROM visited_countries WHERE country_code=$1", [inputCountryCode]);
    if (result.rows.length !== checkCountryCode.rows.length) { //This If Else code will make sure that no country is added more than once.

      let sqlCode2 = `INSERT INTO visited_countries (country_code) VALUES ($1)`;

      await db.query(sqlCode2, [`${inputCountryCode}`]);

      res.redirect("/");
    } else {
      let countries = await findCountryCode();

      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: ` ${name} is already in our records`
      });
    }
  } else {
    let countries = await findCountryCode();

    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Kindly Enter the Official name of the country."
    });
  }

})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
