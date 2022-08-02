const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jsonwebtoken');
const { io } = require('../index');

//mensajes de sockets
io.on('connection', client => {

    console.log('Cliente conectado');

    const [ valido, uid ] = comprobarJWT(client.handshake.headers['x-token']);

    //verificar autenticacion

    if(!valido) {
        return client.disconnect();
    }

    //Cliente autenticado

    usuarioConectado(uid);

    console.log('Cliente autenticado');


    //ingresar al usuario en una sala
    //sala globlal, client.id, 62e29fc6297ff70b684d0f3b

    client.join(uid);

    //escuchar del cliente el mensaje-personal

    client.on('mensaje-personal', async (payload)=>{
        //TODO: guargar mensaje

        await grabarMensaje(payload);

        io.to(payload.para).emit('mensaje-personal',payload);
    });





    client.on('disconnect', () => { 
        usuarioDesconectado(uid);
        console.log('Cliente desconectado');
});

    /**client.on('mensaje', (payload)=>{
        console.log('Mensaje!!',payload);

        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    });**/ 
  });

