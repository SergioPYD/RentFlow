const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const uploader = require("../middlewares/cloudinary.config");



const Piso = require("../models/Piso.model");
const User = require("../models/User.model");

//GET:  Se muestran todos los pisos del propietario gracias al ID del payload.

router.get("/verTodos", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload; //
  try {
    const response = await Piso.find({ propietario: _id });
    console.log(_id);
    res.status(200).json(response);
  } catch (error) {
    console.log("Error Mostrando archivos");
    next(error);
  }
});

//POST: Aqui creo un nuevo piso

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

// GET: Se muestran los detalles de un piso.
router.get("/:idPiso/details", isAuthenticated, async (req, res, next) => {
  const { idPiso } = req.params;

  try {
    const response = await Piso.findById(idPiso);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// DELETE: Se elimina un piso
router.delete("/:idPiso/delete", isAuthenticated, async (req, res, next) => {
  const { idPiso } = req.params;

  try {
    await Piso.findByIdAndDelete(idPiso);

    res.status(200).json("Piso borrado correctamente");
  } catch (error) {
    next(error);
  }
});

// PATCH: Se edita el piso con la ID dinámica

router.put("/:idPiso/edit", isAuthenticated, async (req, res, next) => {
  const { idPiso } = req.params;
  const { direccion, renta, descripcion, habitaciones, metros, clave } =
    req.body;

  try {
    await Piso.findByIdAndUpdate(
      idPiso,
      { direccion, renta, descripcion, habitaciones, metros, clave },
      { new: true }
    );

    res.status(200).json("Piso editado correctamente");
  } catch (error) {
    next(error);
  }
});

// POST: Añado fotos al piso.

router.post("/:idPiso/edit-img", isAuthenticated, uploader, async (req, res, next) => {
  const { idPiso } = req.params;

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded!" });
    }

    // Obtén las rutas de los archivos subidos
    const filePaths = req.files.map(file => file.path);

    // Ahora puedes actualizar el campo fotos que es un array de strings
    await Piso.findByIdAndUpdate(idPiso, { fotos: filePaths }, { new: true });

  } catch (error) {
    return next(error);
  }

  return res.json({ imageUrls: req.files.map(file => file.path) });
});

module.exports = router;
