const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const DestinatarioSchema = new mongoose.Schema(
  {
    nombre: String,  
    rut: String,
    email:String,
    telefono: String,
    banco_destino: String,
    tipo_cuenta: String,
    numero_cuenta: Number,
    user: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const Destinatario = mongoose.model("Destinatario", DestinatarioSchema);

module.exports = { Destinatario };