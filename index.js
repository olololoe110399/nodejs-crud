const express = require("express"),
  morgan = require("morgan"),
  helmet = require("helmet"),
  cors = require("cors"),
  dotenv = require("dotenv"),
  path = require("path"),
  rfs = require("rotating-file-stream"),
  connectionDatabase = require("./src/configs/db.config");

dotenv.config();

connectionDatabase.default();

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

app.use("/api", require("./src/routes/router.js").default);

app.get("*", (_, res) => {
  res.json({
    messages: "hello duy",
  });
});

app.get("/", (_, res) => {
  res.json({
    messages: "hello duy",
  });
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
