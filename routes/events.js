

const express = require('express');
const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');


const router = express.Router()

router.use(validarJWT);

// Obtener eventos
router.get(
            '/',
            getEventos
)

// Crear eventos
router.post(
            '/',
            [
                check('title', 'El titulo es obligatorio').not().isEmpty(),
                check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
                check('end', 'La fecha de fin es obligatoria').custom( isDate ),
                validarCampos
            ],
            crearEvento
)

router.put(
            '/:id',
            actualizarEvento
)

router.delete(
            '/:id',
            borrarEvento
)

module.exports = router;