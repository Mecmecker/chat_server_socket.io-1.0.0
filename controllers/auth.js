const { response } = require("express");
const { validationResult } = require("express-validator");
const { findOne } = require("../models/usuario");
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJwt } = require("../helpers/jsonwebtoken");
const usuario = require("../models/usuario");

const crearUsuario = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        const exiteEmail = await Usuario.findOne({email});

        if ( exiteEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //generar Json web token

        const token = await generarJwt(usuario.id);


        res.json({
            ok: true,
            usuario: usuario,
            token
         });
        
    } catch(error){
        console.log(error);
        res.status(500).json({
            ok : false,
            msg: 'Hable con el admin'
        });

    }


    
}

const loginUsuario = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //validar  el password

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es valida'
            });
        }

        //generar JWT

        const token = await generarJwt(usuarioDB.id);


        res.json({
            ok: true,
            usuario: usuarioDB,
            token
         });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            msg: 'Hable con el admin'
        });
    }
    
    
}


const renewToken = async (req, res = response) => {


    const uid = req.uid;

    const token = await generarJwt(uid);

    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        usuario,
        token
     });

}

module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken
}