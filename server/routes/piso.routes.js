const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const Piso = require("../models/Piso.model");
const User = require("../models/User.model");

router.get("/verTodos", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload; //
  try {
    const response = await Piso.find({ propietario: _id });
    console.log(_id)
    res.status(200).json(response);
  } catch (error) {
    console.log("Error Mostrando archivos")
    next(error);
    
  }
});

router.post("/add", isAuthenticated, async (req, res, next) => {
  const { direccion, renta, clave, propietario } = req.body;

  if (!direccion || !renta || !clave || !propietario) {
    res
      .status(400)
      .json({ errorMessage: "Por favor, rellena todos los campos" });
    return;
  }

  try {
    await Piso.create({
      direccion,
      renta,
      clave,
      propietario,
    });

    res.status(200).json("Piso añadido correctamente");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
