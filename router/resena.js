const express = require('express');
const { verifyToken } = require('../midalwere/authValidation')

const Resena = require('../services/resena')

function resena(app){
    const router = express.Router()
    app.use("/mov/resena", router)

    const resenaServices = new Resena()

    router.get('/:id', async (req, res)=>{

        const idPelicula = req.params.id
        const result = await resenaServices.getResenasofMovie(idPelicula)

        res.status(200).json(result)

    })

    // router.post('/:idMovie' , verifyToken, async(req, res)=>{
    //     const id = req.params.idMovie
    //     console.log(id)
    //     const {username} = req.usuario 
    //     const data = req.body

    //     const result = await resenaServices.createResenaMovie({...data, userCreacion: username, idmovie:id})

    //     res.status(result.success?201:400).json(result)
    // })

    router.post('/' , verifyToken, async(req, res)=>{
    
        const {username} = req.usuario 
        const data = req.body
        console.log(req.body)
        const result = await resenaServices.createResenaMovie({...data, userCreacion: username})

        res.status(result.success?201:400).json(result)
    })

    router.put('/:id', verifyToken,async(req,res)=>{
        const data = req.body
        const id = req.params.id
        const{usuario}= req 

        const result = await resenaServices.updateResena(id, data, usuario)

        res.status(201).json(result)
    })

    router.delete('/:id', verifyToken, async(req, res)=>{
        const id = req.params.id 

        const result = await resenaServices.deleteResena(id)
        res.status(201).json(result)
    })
}

module.exports = resena