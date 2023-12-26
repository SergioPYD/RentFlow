const { Schema, model } = require("mongoose");

const pisoSchema = new Schema({
  direccion: {
    type: String,
    required: true,
  },
  renta: {
    type: Number,
    required: true,
  },
  fotos: {
    type: [String],
  },
  descripcion: {
    type: String,
  },
  habitaciones: {
    type: Number,
  },
  metros: {
    type: Number,
  },
  clave: {
    type: String || Number,
    required: true
  },
  propietario: {
    type: Schema.Types.ObjectId,
    ref: "User",
    
  },
  inquilino: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  gastos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Gasto",
    },
  ],
  incidencias: [
    {
      type: Schema.Types.ObjectId,
      ref: "Incidencia",
    },
  ],
});

const Piso = model("Piso", pisoSchema);

module.exports = Piso;
