import Sequelize from "sequelize";
import db from "../config/db.js";

export const Testimonial = db.define("testimoniales", {
  nombre: {
    type: Sequelize.STRING, //STRING = VARCHAR
  },
  correo: {
    type: Sequelize.STRING,
  },
  mensaje: {
    type: Sequelize.STRING,
  },
});
