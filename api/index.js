const express = require("express");

const server = express();

server.listen(3001, () => {
  console.log("Escuchando en puerto 3001");
});
