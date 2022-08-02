/*
    Path: /api/mensajes
*/

const {Router} = require('express');
const { obtenerChar } = require('../controllers/mensajes');
const { validarJWT } = require('../middlewares/validar_jwt');

const router = Router();



router.get('/:de',validarJWT ,obtenerChar);

module.exports = router;