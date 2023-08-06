const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema ({
    nombre:{
        type: String,
        required: true,
    },
    apellido:{
        type: String,
        required: true,
    },
    dni:{
        type: String,
        required: true,
    },
    profesion:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    telefono:{
        type: Number,
        required: true,
    },
    precioConsultaDolar:{
        type: String,
        required: true,
    },
    precioConsultaPesos:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
})

const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;
