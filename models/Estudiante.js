const mongoose = require('mongoose');

const estudianteEsquema = new mongoose.Schema({
    nombre : String,
    edad : Number,
    direccion : String,
    carrera : String,
    matricula : String,
    fechaInscripcion : Date
})

const EstudianteModel = mongoose.model('Estudiante',estudianteEsquema,'estudiantes');
module.exports = EstudianteModel;