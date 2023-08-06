const Profesional = require('../models/staff');
const {validationResult} = require('express-validator');
const axios = require ('axios')

const createProfesional = async (req, res) => {
    try{
        const error = validationResult(req);

        if(error.isEmpty()){
            const {nombre, apellido, dni, profesion, email, telefono, precioConsultaDolar, password} = req.body;
            const {data} = await axios.get('https://api.bluelytics.com.ar/v2/latest');
            console.log(data);
            const precioConsultaPesos = precioConsultaDolar * data.blue.value_sell;

            const profesional = new Profesional({nombre:nombre, apellido:apellido, dni:dni, profesion:profesion, email:email, telefono:telefono, password:password, precioConsultaDolar:precioConsultaDolar, precioConsultaPesos:precioConsultaPesos || 0 });
            await profesional.save();
            res.status(201).json({msg:'ok, Profesional creado', profesional: profesional})
            
        }else{
            res.status(400).json({msg: 'Error en la peticion', error: error})
        }
    }catch(error){
        res.status(500).json({msg: 'Error en la creacion del Profesional: ' + error.message, profesional: null})
    }
}

const updateProfesional = async (req, res) => {
    try{
        const error = validationResult (req);

        if(error.isEmpty){
            const id = req.params.id;
            const {nombre, apellido, dni, profesion, email, telefono, precioConsultaDolar, password} = req.body;
            const {data} = await axios.get('https://api.bluelytics.com.ar/v2/latest');
            console.log(data);
            const precioConsultaPesos = precioConsultaDolar * data.blue.value_sell;

            await Profesional.findByIdAndUpdate(id, ({nombre:nombre, apellido:apellido, dni:dni, profesion:profesion, email:email, telefono:telefono, password:password, precioConsultaDolar:precioConsultaDolar, precioConsultaPesos:precioConsultaPesos || 0 }));
            res.status(200).json({msg: 'Ok. Profesional Actualizado', profesional: req.body})}

        else{ res.status(400).json({msg: 'Error en la peticion', error: error})
        }
    } catch(error){
            res.status(500).json({msg: 'Error en la actualizacion de datos: ' + error.message, profesional: null})
    }
}

const getProfesionales = async (req, res) => {
    try{
        const Profesionales = await Profesional.find();
        res.status(200).json({msg: 'OK', Profesionales: Profesionales})
    }catch(error){
            console.log(`Error en el metodo:`+ error.message);
            res.status(500).json({msg: `Error:`+ error.message, profesional: null})
    }
}

const deleteProfesional = async(req, res) => {
    try{
        const id = req.params.id;
        await Profesional.findByIdAndDelete(id);
        res.status(200).json({msg: 'Ok.Profesional Borrado', profesional: Profesional})
    }catch(error){
        res.status(500).json({msg: 'Error en el delete del profesional: ' + error.message, profesional: null})
    }
}

module.exports = { createProfesional, updateProfesional, getProfesionales, deleteProfesional} 