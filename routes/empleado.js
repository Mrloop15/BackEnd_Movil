var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");

const { body, validationResult } = require("express-validator");

const Empleado = mongoose.model("Empleado");

/* GET home page. */
router.get("/", async function (req, res, next) {
  let empleados = await Empleado.find({});

  res.send(empleados);
});

router.get("/email", async (req, res) => {
  let emp = await Empleado.findOne({ email: req.body.email });
  if (!emp) {
    res.status(400).send("Empleado encontrado");
  }
  res.send({ emp });
});

router.post(
  "/",
  [
    body("nombre")
      .isLength({ min: 3, max: 30 })
      .withMessage("Campo nombre no debe estar vacío"),
    body("ap_paterno").isLength({ min: 3, max: 30 }),
    body("telefono")
      .isLength({ min: 10, max: 10 })
      .withMessage("El campo telefono debe tener 10 digitos"),
    body("email").isEmail().withMessage("Correo electrónico no válido"),
    body("sueldo").isLength({ min: 2 }).isDecimal(),
  ],
  async (req, res) => {
    let errores = validationResult(req);

    if (!errores.isEmpty()) {
      res.status(400).json({ error: errores.array() });
    }
    let emp = new Empleado({
      nombre: req.body.nombre,
      ap_paterno: req.body.ap_paterno,
      ap_materno: req.body.ap_materno,
      email: req.body.email,
      telefono: req.body.telefono,
      direccion: req.body.direccion,
      puesto: req.body.puesto,
      sueldo: req.body.sueldo,
    });
    await emp.save();
    res.status(201).send({ emp });
  }
);

router.put("/", async (req, res) => {
  let emp = await Empleado.findOne({ email: req.body.email });
  if (!emp) {
    res.status(402).send("Empleado no encontrado");
  }

  let emp_modificado = await Empleado.findOneAndUpdate(
    //campo de referencia
    { email: req.body.email },
    //datos a actualizar
    {
      nombre: req.body.nombre,
      ap_paterno: req.body.ap_paterno,
      ap_materno: req.body.ap_materno,
      telefono: req.body.telefono,
      direccion: req.body.direccion,
      puesto: req.body.puesto,
      sueldo: req.body.sueldo,
    },
    //tipo de respuesta
    { new: true }
  );
  res.send({ emp_modificado });
});

//el metodo delete utiliza params en lugar de body y la informacion viene agregada en la url
/*router.delete("/borrar/:email", async (req, res) => {
  let emp = await Empleado.findOne({ email: req.params.email });

  if (!emp) {
    res.status(402).send("Empleado no encontrado");
  }

  let emp_eliminado = await Empleado.findOneAndDelete({
    email: req.params.email,
  });

  res.send({ emp_eliminado });
});*/

router.delete("/borrar/:email", async (req, res) => {
  try {
    // Buscar el empleado por su email
    const emp = await Empleado.findOne({ email: req.params.email });

    // Verificar si el empleado existe
    if (!emp) {
      return res.status(404).send("Empleado no encontrado");
    }

    // Eliminar el empleado
    const emp_eliminado = await Empleado.findOneAndDelete({
      email: req.params.email,
    });

    // Enviar respuesta con el empleado eliminado
    res.send({ message: "Empleado eliminado exitosamente", emp_eliminado });
  } catch (error) {
    // Manejo de errores
    console.error("Error al eliminar el empleado:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.delete("/borrar/:nombre", async (req, res) => {
  let proud = await Producto.findOne({ nombre: req.params.nombre });
  if (!prod) {
    return res.status(402).send("Producto no encontrado");
  }
  //http://localhost:300/foto/imagen-1636379151090-59215371.png
  let urlfotoanterior = prod.imgurl.split("/");
  //console.log(urlfotoanterior[4]);
  //obtiene la url de la imagen almacenada
  //agregar a imgurl dicha url obtenida

  let prod_eliminado = await producto.findOneAndDelete({
    nombre: req.params.nombre,
  });
  await fs.unlink(path.resolve("almacen/img/" + urlfotoanterior[4]));
  res.send({ prod_eliminado });
});

router.get("/", async (req, res) => {
  /*try{
  const resultado = await Producto.find();
  res.json(resultado);
}catch(err){
console.log(err);
res.status(500).send('error en el servidor');
}*/
  let pro = await Producto.find({});
  res.send(pro);
});

router.get("/nombre/:nombre", async (req, res) => {
  let pro = await Producto.findOne({ nombre: req.params.nombre });
  if (!pro) {
    return res.status(401).send("Producto no encontrado");
  }
});

module.exports = router;
/*module.exports = {
  Empleado: router,
};*/
