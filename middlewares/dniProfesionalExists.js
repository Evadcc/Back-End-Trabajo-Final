const Profesional = require('../models/staff');

const dniProfesionalExists = async(req, res, next) => {
    try{
        const dni = await Profesional.findOne({dni: req.body.dni});

        if(dni){
            res.status(400).json({msg: 'El DNI del profesional ya existe.'})
        }else{
            console.log('Middleware chequeo nombre pasado...')
            next();
        }
    }catch(error){ 
        res.status(500).json({msg: 'Error al comunicarse con la base de datos:' + error.msg})
    }
}

module.exports = dniProfesionalExists