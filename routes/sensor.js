var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const Sensor = mongoose.model("Sensor");
const arduinoPort = "COM9";
const arduinoSerialPort = new SerialPort({ path: arduinoPort, baudRate: 9600 });
const parser = arduinoSerialPort.pipe(
  new ReadlineParser({ delimiter: "\r\n" })
);

let valorDistancia = "";

// Rutas del método HTTPS
router.get("/", async (req, res) => {
  parser.on("data", function (data, err) {
    if (err) {
      return console.log(err);
    }
    console.log("valor:" + data);
    valorDistancia = data.toString("utf8");
  });
  res.send({ valorDistancia });
});

router.get("/reanudar", async (req, res) => {
  arduinoSerialPort.resume();
  res.send({ valorDistancia });
});

router.get("/detener", async (req, res) => {
  arduinoSerialPort.pause();

  detenido = {
    msg: "cerrar",
  };
  res.send({ detenido });
});

router.post("/", async (req, res) => {
  var distancia = new Sensor({
    fecha: req.body.fecha,
    hora: req.body.hora,
    //distancia: valorDistancia
    lectura: req.body.lectura,
  });
  await distancia.save();
  res.status(201).send(distancia);
});

// Apertura del puerto COM4

arduinoSerialPort.on("open", function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("Exito en apertura");
});

let puerta = true; // Esto significa puerta física cerrada
parser.on("data", async function (data, err) {
  if (err) {
    return console.log(err);
  }
  console.log("valor:" + data);
  valorDistancia = data.toString("utf8");

  /* if(valorDistancia =="Abierto"){
         puerta = false;
         var distancia = new Sensor({
             fecha: new Date(),
             hora: new Date().getTime(),
             distancia: valorDistancia,
             lectura: req.body.lectura
         });
         await distancia.save();
     }
     else if(valorDistancia == "cerrado"){
         puerta = true;
         var distancia = new Sensor({
             fecha: new Date(),
             hora: new Date().getTime(),
             distancia: valorDistancia,
             lectura: req.body.lectura
         });
         await distancia.save();
     }

     if(puerta == true && valorDistancia == "intruso detectado"){
         var distancia = new Sensor({
             fecha: new Date(),
             hora: new Date().getTime(),
             distancia: valorDistancia,
             lectura: req.body.lectura
         });
         await distancia.save();
     }*/
});

arduinoSerialPort.on("error", function (err) {
  if (err) {
    return console.log(err);
  }
});

module.exports = router;
