const { model, Schema } = require("mongoose");

const esquema = new Schema({
  correo: String,
  contrasena: String,
  fullName: String,
  fecha: Date,
  important: Boolean,
});

esquema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const modelo = model("Data_user", esquema);

module.exports = modelo;
