const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {
    try {
       await mongoose.connect(process.env.DB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       });

       console.log('DB online');
    } 
    
    catch(error){
        console.log(error);
        throw new Error('Error en la base de datos hable con admin');
    }
}

module.exports = {
    dbConnection
}