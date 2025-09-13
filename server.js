const express = require('express');
const {connectToDatabase} = require('./src/utils/db');
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const {routes} = require("./src/utils/routes");
var cors = require("cors");
require('dotenv').config();



const app = express();
const PORT = 6000;

app.use( cors({
  origin: "*",
  Credential: true
}));
app.use(bodyParser.json());

// app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

//json werbtoken setup
app.use((req, res, next) => {
  if (req.headers && req.headers.authorization) {
    jsonwebtoken.verify(
      req.headers.authorization,
      "RESTFULAPIs",
      (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
      );
    } else {
      req.user = undefined;
      next();
    }
  });
  
  routes(app);
  // console.log(module);

  connectToDatabase()
  
  app.get("/", (req, res) =>
    res.send(`Node and Express server is running on ${PORT}, go and create mysql db api.`)
  );

  app.listen(PORT, () => console.log(`your server is running on port Server listening at http://localhost:${PORT}`))
