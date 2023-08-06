const mongoose = require('mongoose');
require('dotenv').config();

const connect = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log ('Base de datos conectada correctamente ..');
    }catch(error){
        console.log(`Error al conectar a la base de datos - Error: ${error.message}`)
    }
}
module.exports = connect;