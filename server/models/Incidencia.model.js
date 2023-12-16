const { Schema, model } = require("mongoose");

const tiposIncidenciaEnum = ["Mantenimiento", "Emergencia", "Otros"];
const estadosIncidenciaEnum = [
    "Pendiente", "En proceso", "Solucionada"
];

const incidenciaSchema = new Schema({
  tipo: { type: String, enum: tiposIncidenciaEnum, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  estado: { type: String, enum: estadosIncidenciaEnum, default: "Pendiente" },
  fotos: {type:String}
  
});

// Crear modelo a partir del esquema
const Incidencia = model("Incidencia", incidenciaSchema);

module.exports = { Incidencia };
