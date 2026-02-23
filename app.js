import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { addArticle, loadAllArticles } from "./utils/handle_articles.js";

const app = express();
const port = process.env.PORT || "5123";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressEjsLayouts);
app.use(express.static(join(__dirname, "public")));

app.set("PORT", port);
app.set("view engine", "ejs");
app.set("layout", "layouts/main.ejs");

app.get("/", async (req, res) => {
  res.render("home", { articles: await loadAllArticles() });
});

app.get("/new-article", (req, res) => {
  res.render("new-article");
});

app.post("/publish-article", (req, res) => {
  console.log(req.body);
  // if (req.body.paragraph.length === 20) res.redirect()
  addArticle(req.body.title, req.body.paragraph)
    .then((data) => {
      console.log(`Data revieved: ${data}`);
    })
    .catch((err) => {
      console.error(`Something went wrong: ${err}`);
    });
  res.send("done");
});

app.get("/article/:id", (req, res) => {
  res.type("text/plain").send(`article ${req.params.id}`);
});

app.listen(app.get("PORT"), (err) => {
  !err
    ? console.log(
        `Server running on http://localhost:${app.get(
          "PORT"
        )}; Press Ctrl + C to terminat`
      )
    : console.error(err);
});
