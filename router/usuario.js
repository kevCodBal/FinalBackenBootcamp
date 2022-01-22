const express = require('express');
const Usuarios = require("../services/usuario")

function usuario(app){
    const router = express.Router()

    app.use("/mov/usuario", router)

    const usuarioService = new Usuarios()

    router.get("/", async (req, res)=>{
        const result = await usuarioService.getUsers()
        res.status(200).json(result)
    })

    router.post("/", async (req, res)=>{
        const data = req.body
        const result = await usuarioService.createUser(data)

        res.status(200).json(result)
    })

    
}

module.exports= usuario