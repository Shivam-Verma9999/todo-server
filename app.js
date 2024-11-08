const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const PORT = 3000;

const app = express();
app.set("views", path.join(__dirname + "/src/views"));
app.set("view engine", "ejs");

let corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5000",
    "http://40.121.182.221:9000",
    "https://todo-app-frontend-z9h0.onrender.com",
  ],
  credentials: true,
};

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: "TODO" }));
app.use(express.static(__dirname + "public"));
require("./src/config/passport")(app);

//Routes of application
const authRouter = require("./src/routes/authRoutes")();
const varifyRouter = require("./src/routes/verifyMail")();
const profileRouter = require("./src/routes/profileRoutes")();
const updateRouter = require("./src/routes/updateRoutes")();
const deleteRouter = require("./src/routes/deleteRoutes")();
const shareRouter = require("./src/routes/shareRoutes")();

//test

app.use("/api/auth", authRouter);
app.use("/api/verifyMail", varifyRouter);
app.use("/api/profile", profileRouter);
app.use("/api/update", updateRouter);
app.use("/api/delete", deleteRouter);
app.use("/api/share", shareRouter);

app.get("*", (req, res) => {
  res.statusCode = 404;
  res.statusMessage = "Page Not Found";
  res.send("Page not found");
});

app.listen(PORT, () => {
  console.log(`Listening On port ${PORT}`);
});
