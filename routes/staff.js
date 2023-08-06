const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const {check} = require('express-validator');
const dniProfesionalExists = require('../middlewares/dniProfesionalExists');

/* GET users listing. */
router.post('/',check("nombre").not().isEmpty().withMessage("El campo de nombre esta vacio").isAlphanumeric(), check("profesion").not().isEmpty().withMessage("El campo de profesion esta vacio"), dniProfesionalExists, staffController.createProfesional);

router.put('/:id([0-9a-fA-F]{24})', check("nombre").not().isEmpty().withMessage("El campo de nombre esta vacio").isAlphanumeric(), check("apellido").not().isEmpty().withMessage("dni").isLength({min:8, max:8}).withMessage("El codigo debe tener 8 digitos"), staffController.updateProfesional)

router.get('/profesionales', staffController.getProfesionales)

router.delete('/:id([0-9a-fA-F]{24})', staffController.deleteProfesional)

module.exports = router;