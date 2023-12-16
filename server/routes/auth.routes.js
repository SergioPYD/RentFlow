const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const isAuthenticated = require("../middlewares/isAuthenticated");
const User = require("../models/User.model");

// POST 'api/auth/signup' => Registra un nuevo usuario
router.post("/signup", async (req, res, next) => {

  const { name,subname, email, password, repitPassword, role } = req.body;
  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  if (!name ||!subname || !email || !password || !repitPassword || !role) {
    res.status(400).json({ errorMessage: "Por favor, rellena todos los campos" });
    return;
  }

  if (!regexEmail.test(email)) {
    res.status(400).json({ errorMessage: "Por favor, escribe un email correcto" });
    return;
  }

  if (!regexPassword.test(password)) {
    res.status(400).json({ errorMessage: "La contraseña debe tener al menos una mayuscula, una minuscula, un número y 8 caracteres" });
    return;
  }

  if (password !== repitPassword) {
    res.status(400).json({ errorMessage: "Las contraseñas no coinciden" });
    return;
  }

  try {

    const foundUser = await User.findOne({ email });


    if (foundUser) {
      res.status(400).json({ errorMessage: "Este email ya está en uso" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ name,subname,role, email, password: hashedPassword });

    res.status(200).json("User created successfully");
  } catch (error) {
    next(error);
  }
});

// POST 'api/auth/login' => Inicia sesión con un usuario existente
router.post("/login", async (req, res, next) => {
  
  const { email, password, isChecked } = req.body;

  if (!email || !password) {
    res.status(400).json({ errorMessage: "Por favor, rellene todos los campos" });
    return;
  }
  
  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      res.status(400).json({ errorMessage: "El email no existe" });
      return;
    }

    const isSamePassword = await bcrypt.compare(password, foundUser.password);

    if (!isSamePassword) {
      res.status(400).json({ errorMessage: "Contraseña incorrecta" });
      return;
    }

    const payload = {
      _id: foundUser._id,
      role: foundUser.role,
      email: foundUser.email,
    };

    let authToken;

    if(isChecked === true) {
      authToken = jwt.sign(payload, process.env.SECRET_TOKEN,
        { expiresIn: "7d", algorithm: "HS256" });

    } else {
      authToken = jwt.sign(payload, process.env.SECRET_TOKEN,
        { expiresIn: "1h", algorithm: "HS256" });
    }


    res.json({ authToken });

  } catch (error) {
    next(error);
  }
});

// GET 'api/auth/verify' => Verifica si el usuario está logueado
router.get("/verify", isAuthenticated, (req, res, next) => {
  
  console.log(req.payload);
  res.json(req.payload)
});

module.exports = router;