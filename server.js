require("dotenv").config();

// Express Server
const express = require("express");
const cors = require("cors");
const app = express();

// Llamando a Mongoose
require("./mongo.js");
const modelo = require("./esquema.js");
require("mongoose");

// Cors
app.use(cors());
app.use(express.json());

// Obteniendo los datos de MongoDB
app.get("/db", (req, res) => {
  modelo
    .find()
    .then((respuesta) => {
      res.json(respuesta).status(200);
    })
    .catch((error) => {
      console.log("Ha ocurrido un error", error);
    });
});

// Obteniendo valor en especifico
app.get("/db/:id", (req, res) => {
  const { id } = req.params;

  modelo.findById(id).then((contenido) => {
    if (contenido) {
      res.json(contenido);
    } else {
      return res.status(404).end();
    }
  });
});

// Enviado datos por metodo Post al servidor
app.post("/users", (req, res) => {
  const contenido = req.body;

  if (!contenido.important) {
    contenido.important = false;
  }

  if (!contenido.correo || !contenido.contraseña) {
    return res.status(400).json({ error: "No cumples con los requisitos" });
  }

  const newRegisterInfo = new modelo({
    correo: contenido.correo,
    contraseña: contenido.contraseña,
    fecha: new Date(),
    important: contenido.important,
  });

  return newRegisterInfo.save().then((data) => {
    res.json(data).status(200);
    console.log("¡Los datos se han enviado correctamente!", data);
  });
});

// Bienvenida
app.get("/", (req, res) => {
  res.send("Bienvenido a mi API, espero la disfrutes!").status(200);
});

// Abriendo el servidor
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`¡Servidor abierto! http://localhost:${port}`);
});
