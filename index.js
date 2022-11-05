const express = require("express"),
  morgan = require("morgan"),
  helmet = require("helmet"),
  cors = require("cors"),
  dotenv = require("dotenv"),
  path = require("path"),
  handlebars = require("express-handlebars"),
  rfs = require("rotating-file-stream"),
  connectionDatabase = require("./src/configs/db.config");

dotenv.config();

connectionDatabase();

const port = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV == "production";

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "log"),
});

const app = express();

app.use(helmet());
app.use(
  isProduction
    ? morgan("combined", { stream: accessLogStream })
    : morgan("tiny")
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine(
  ".hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "src/views/partials"),
    layoutsDir: path.join(__dirname, "src/views/layouts"),
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "src/views"));

app.use("/api", require("./src/routes/router.js"));

app.get("/admin", (_, res) => {
  res.render("welcome");
});

app.get("*", (_, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
