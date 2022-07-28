
/*
path:api/login
*/

const {Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');

const router = Router();

router.post('/new',[
    check('nombre','El nombre es obligatorio').not().notEmpty(),
    check('email','El email es obligatorio y debe ser valido ***@***').isEmail(),
    check('password','El password es obligatorio').not().notEmpty(),
    validarCampos,
] ,crearUsuario);

router.post('/',[
    check('email','El email es obligatorio y debe ser valido ***@***').isEmail(),
    check('password','El password es obligatorio').not().notEmpty(),
    validarCampos,
],loginUsuario);

router.get('/renew',validarJWT , renewToken);

module.exports = router;
