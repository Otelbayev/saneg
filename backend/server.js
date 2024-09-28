const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger");

const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, {
    swaggerOptions: {
      docExpansion: "none", // Set to 'none' to have all sections collapsed by default
    },
  })
);
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/user", userRoutes);

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
