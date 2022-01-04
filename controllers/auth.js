const bcrypt = require('bcryptjs');
const {response} = require('express');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({email});
        
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese correo'
            });
        }

        usuario = new Usuario(req.body);    

        // encriptar contraseña
        const salt = bcrypt.genSaltSync(10)
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario.id, usuario.name)
    
        res.status(201).json({
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error, hable con el admin.',
        });
    }
}

const loginUsuario = async (req, res=response) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({email});
        
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese correo'
            });
        }

        // match passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        const token = await generarJWT(usuario.id, usuario.name)

        res.json({
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            token
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error, hable con el admin.',
        });
    }

    

    

    

}

const revalidarUsuario = async (req, res=response) => {
    const { uid, name } = req;

    const token = await generarJWT(uid, name)

    res.json({
        ok: true,
        token
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarUsuario
}