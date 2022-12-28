const express = require("express");
const {
  getReservas,
  crearReserva,
  actualizarReserva,
  borrarReserva,
} = require("../controllers/reservas");

const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const router = express.Router();

router.use(validarJWT);

// Obtener reservas
router.get("/", getReservas);

// Crear eventos
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha de fin es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearReserva
);

router.put("/:id", actualizarReserva);

router.delete("/:id", borrarReserva);

module.exports = router;
