const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});


const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const rutaPisos = require("./piso.routes");
router.use("/piso", rutaPisos);

module.exports = router;
