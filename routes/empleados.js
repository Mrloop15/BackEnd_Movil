var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  empleados = [
    { nombre: "andres", puesto: "gerente" },
    { nombre: "rosa", puesto: "supervisor" },
    { nombre: "luis", puesto: "cajero" },
    { nombre: "ana", puesto: "vendedor" },
  ];

  res.send({ empleados });
});
module.exports = router;
