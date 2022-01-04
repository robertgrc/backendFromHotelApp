const express = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarUsuario } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = express.Router();

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe contener 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ], 
    crearUsuario
);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('password', 'El password debe contener 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ], 
    loginUsuario
);

router.get('/renew', validarJWT, revalidarUsuario);


/* router.delete() */

module.exports = router;