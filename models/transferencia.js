const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const TransferenciaSchema = new mongoose.Schema(
  {
    nombre: String,  
    rut: String,
    email:String,
    banco_destino: String,
    tipo_cuenta: String,
    monto: Number,
    numero_cuenta: Number,
    user: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const Transferencia = mongoose.model("Transferencia",TransferenciaSchema);

module.exports = { Transferencia };