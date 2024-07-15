import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 8000;

app.set("view engine", "ejs");

// Use the public folder for static files.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://v2.jokeapi.dev/joke/Any?type=single"
    );
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request: ", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const category = req.body.category;
    const type = req.body.type;

    const response = await axios.get(
      `https://v2.jokeapi.dev/joke/${category}?type=${type}`
    );
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request: ", error.message);
    res.render("index.ejs", {
      error: "No jokes that match your criteria.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server has started on Port:${port}`);
});
