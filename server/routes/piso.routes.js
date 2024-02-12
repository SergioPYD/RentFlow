const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const uploader = require("../middlewares/cloudinary.config");
const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const Piso = require("../models/Piso.model");
const User = require("../models/User.model");

//GET:  Se muestran todos los pisos del propietario gracias al ID del payload.

router.get("/verTodos", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload; //
  try {
    const response = await Piso.find({ propietario: _id });
    ;
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

    
    const filePaths = req.files.map(file => file.path);

   
    await Piso.findByIdAndUpdate(idPiso, { $push: { fotos: { $each: filePaths } } }, { new: true });

  } catch (error) {
    return next(error);
  }

  return res.json({ imageUrls: req.files.map(file => file.path) });
});


router.delete('/:idPiso/delete-img', async (req, res) => {
  const { idPiso } = req.params;
  const { index } = req.body; 

  try {
   
    const piso = await Piso.findById(idPiso);

    const updatedPiso = await Piso.findByIdAndUpdate(
      idPiso,
      { $pull: { fotos: { $in: [piso.fotos[index]] } } },
      { new: true } 
    );

    if (!updatedPiso) {
      return res.status(404).json({ error: 'Piso no encontrado' });
    }

    
    
    res.json({ message: 'Imagen eliminada con éxito', deletedIndex: index });
  } catch (error) {
   
    console.error('Error al eliminar la imagen:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});




module.exports = router;
