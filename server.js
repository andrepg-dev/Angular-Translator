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

// Bienvenida
app.get("/", (req, res) => {
  res.send("Bienvenido a mi API, espero la disfrutes!").status(200);
});

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
app.post("/db", (req, res) => {
  const contenido = req.body;

  if (!contenido.important) {
    contenido.important = false;
  }

  if (!contenido.correo || !contenido.contrasena || !contenido.fullName) {
    return res.status(400).json({ error: "No cumples con los requisitos" });
  }

  const newRegisterInfo = new modelo({
    correo: contenido.correo,
    contrasena: contenido.contrasena,
    fullName: contenido.fullName,
    fecha: new Date(),
    important: contenido.important,
  });

  return newRegisterInfo.save().then((data) => {
    res.json(data).status(200);
    console.log("¡Los datos se han enviado correctamente!", data);
  });
});

// Eliminar datos
app.delete("/db/delete/:id", (req, res, next) => {
  const { id } = req.params;

  modelo
    .findByIdAndDelete(id)
    .then((result) => {
      console.log("¡Se ha eliminado a un usuario :d!", result);
      return res.json(result).status(200).end();
    })
    .catch((error) => next(error));
});

// Actualizar datos
app.put("/db/update/:id", (req, res) => {
  const { id } = req.params;
  const request_body = req.body;

  if (!request_body.contrasena) {
    return res.json({ error: "Tienes que subir una contrasena" }).status(400);
  }

  const newInfo = {
    contrasena: request_body.contrasena,
    fecha: new Date(),
  };

  modelo.findByIdAndUpdate(id, newInfo, { new: true }).then((result) => {
    res.json(result);
    console.log("¡Se ha actualizado un nuevo usuario!", result);
  });
});

app.use((error, req, res, next) => {
  if (error.name == "CastError") {
    res.status(400).send({ error: "no estas usando bien la id" });
  } else {
    res.status(500).end();
  }
});

// Abriendo el servidor
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`¡Servidor abierto! http://localhost:${port}`);
});
