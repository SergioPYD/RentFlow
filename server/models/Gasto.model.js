const { Schema, model } = require("mongoose");

const currentYear = new Date().getFullYear();

const gastoSchema = new Schema(
  {
    tipo: {
      type: String,
      enum: ["Agua", "Luz", "Gas", "Renta", "Otros", "Comunidad", "Basuras"],
      required: true,
    },
    descripcion: {
      type: String,
    },
    resguardo: {
      type: String,
    },
    mes: {
      type: String,
      enum: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      required: true,
    },
    año: {
      type: Number,
      default: currentYear,
    },
  },
  {
    timestamps: true,
  }
);

const Gasto = model('Gasto', gastoSchema);

module.exports = { Gasto };