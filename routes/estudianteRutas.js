const express = require('express');
const rutas = express.Router();
const EstudianteModel = require('../models/Estudiante');

rutas.get('/', async (req, res) =>{
    try {
        const estudiantes = await EstudianteModel.find();
        console.log(estudiantes);
        res.json(estudiantes);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

rutas.post('/agregar', async (req, res) =>{
    // console.log(req.body);
    const nuevoEstudiante = new EstudianteModel({
        nombre: req.body.nombre,
        edad: req.body.edad,
        direccion: req.body.direccion,
        carrera: req.body.carrera,
        matricula: req.body.matricula,
        fechaInscripcion: req.body.fechaInscripcion
    });
    try {
        const guardarEstudiante = await nuevoEstudiante.save();
        res.status(201).json(guardarEstudiante);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.put('/editar/:id', async (req, res) =>{
    try {
        const actualizarEstudiante = await EstudianteModel.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(201).json(actualizarEstudiante);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.delete('/eliminar/:id', async (req, res) =>{
    try {
        const eliminarEstudiante = await EstudianteModel.findByIdAndDelete(req.params.id);
        res.json({mensaje: 'Estudiante eliminado correctamente...'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

//Consultas
// - Listar todos los estudinates con edad igual a 20
rutas.get('/estudiante-edad/:id', async (req, res) =>{
    try {
        console.log(req.params.id);
        const edadEstudiante = await EstudianteModel.find({ edad: req.params.id});
        res.json(edadEstudiante);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
// - Ordenar los estudiantes por nombre de forma ascendente
rutas.get('/ordenar-estudiante', async (req, res) =>{
    try {
        const estudiantesASC = await EstudianteModel.find().sort({nombre: 1});
        res.json(estudiantesASC);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

module.exports = rutas;