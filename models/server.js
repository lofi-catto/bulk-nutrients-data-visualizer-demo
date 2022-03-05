const express = require("express");
const cors = require("cors");
const path = require("path");
const { getExternalData } = require("../controllers/home.controller");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      homepage: "/api/home",
    };

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());

    // Pick up React index.html file
    this.app.use(express.static(path.join(__dirname, "../client/build")));
  }

  // Bind controllers to routes
  routes() {
    this.app.use(this.paths.homepage, require("../routes/home"));
    // Catch all requests that don't match any route
    this.app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port: ", this.port);
      // get data as soon as server starts
      getExternalData();
    });
  }
}

module.exports = Server;
