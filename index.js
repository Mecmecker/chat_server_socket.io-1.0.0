const express = require('express');


//DB config
const {dbConnection} = require('./database/config').dbConnection();


const path = require('path')
require('dotenv').config();

const app = express(); 


//Lectura y parseo del body

app.use(express.json());

//node server

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);


require('./sockets/socket');

//path publico

const publicPath = path.resolve(__dirname, 'public')

app.use(express.static (publicPath));

//mis rutas

app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/mensajes', require('./routes/mensajes'));

server.listen( 3000, (err) => {
    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);
});