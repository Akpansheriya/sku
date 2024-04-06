const express = require("express");
const app = express();
const port = 7000;
const morgan = require("morgan");
const cors = require("cors");

const adminRouteHandler = require("./routes/adminRoute");
const dataRouteHandler = require("./routes/dataRoute");
const { sequelize } = require("./config/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/admin", adminRouteHandler);
app.use("/dashboard", dataRouteHandler);
 app.use("/profile", express.static("./public/images"));






sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`server listening on :: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database" + err);
  });

app.get("/", (req, res) => {
  res.send("hello from backend side");
});
