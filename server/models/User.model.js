const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      lowercase: true,
    },
    subname: {
      type: String,
      required: [true, "El inquilino es requerido"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "El Email es requerido."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Contraseña requerida."],
    },
    role: {
      type: String,
      enum: ["Propietario", "Inquilino"],
      required: [true, "El rol es requerido."],
    },
    profilePic: {
      type: String,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
