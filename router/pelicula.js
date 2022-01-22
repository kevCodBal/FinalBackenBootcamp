const express = require('express');
const Peliculas = require("../services/peliculas")
const {verifyTokenAdmin, verifyToken}= require('../midalwere/authValidation')


function peliculas(app){
    const router = express.Router()

    app.use("/mov/peliculas", router)

    const PeliculasService = new Peliculas()


    router.get('/' , async (req, res)=>{
        const result = await PeliculasService.getPeliculas()

        res.status(200).json(result)
    })

    router.get('/mispeliculas',verifyTokenAdmin ,async (req, res) =>{
        req.isAuthenticated()
        const {id}= req.usuario
        const result = await PeliculasService.getPeliculaByUser(id)
        res.status(200).json(result)
    })

    router.get('/genero/:genero', async (req, res) =>{
        const genero = req.params.genero

        const result = await PeliculasService.getPeliculasByGenero(genero)
        res.status(200).json(result)
    })

    router.get('/anoestreno/:estreno', async (req, res) =>{
        const estreno = req.params.estreno
        const result = await PeliculasService.getPeliculasByEstreno(estreno)
        res.status(200).json(result)
    })

    router.get('/nombre/:nombre', async (req, res) =>{
        const nombre = req.params.nombre

        const result = await PeliculasService.getPeliculasByNombre(nombre)
        res.status(200).json(result)
    })

    router.get('/:id', async (req, res) =>{
        const id = req.params.id

        const result = await PeliculasService.getPelicula(id)
        res.status(200).json(result)
    })

    router.post('/', verifyTokenAdmin, async(req, res)=>{
        
        const {id} = req.usuario 
        
        const data = req.body
       
        
        const result = await PeliculasService.createPelicula({...data, idUsuario:id})

        res.status(result.success?201:400).json(result)
    
    })

    router.put('/:id', async(req,res)=>{
        const data = req.body
        const id= req.body.params.id
        const {usuario}=req

        const result = await PeliculasService.updatePelicula(id, data, usuario)
        res.status(201).json(result)

    })

    router.delete('/:id',verifyToken, async(req, res)=>{
        const id = req.params.id
        
        const result = await PeliculasService.deletePelicula(id)
        res.status(201).json(result)
    })
    

}

module.exports = peliculas