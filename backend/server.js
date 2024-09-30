const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/user");
const employeeRoutes = require("./routes/employeeRoutes");
const jobTitleRoutes = require("./routes/jobTitleRoutes");

const app = express();

app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/admin", userRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/jobtitle", jobTitleRoutes);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
