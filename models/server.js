const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.port;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server)
    this.paths = {};

    // coneccion a base de datos
    //no tengo

    // middlewares
    this.middlewares();

    //routes
    this.routes();

    // Sockets
    this.sockets()
  }

  // meddlewers
  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  // routes
  routes() {
    // this.app.use(this.paths.usuarios, usuariosRoutes)
  }

  sockets() {
    this.io.on('connection', socket=> {
        console.log('Cliente conectado', socket.id)


        socket.on('disconnect', ()=> {
            console.log("cliente desconectado", socket.id)
        })
    })
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Server running on port: ", this.port);
    });
  }
}

module.exports = Server;
