const express = require('express');
const Auth = require('../services/auth')

function auth(app){
    const router = express.Router()
    app.use("/mov/auth", router)

    const authServices = new Auth()

    router.post('/signup', async (req, res)=>{

        console.log(req.body)
        const{correo, contrasena, nombre, username, provider, rol} = req.body
        const result = await authServices.registro(correo, contrasena, nombre, username,rol, provider)

        if(result.success){
           
            return res.status(201).json({nombre:result.data,nombre})
        }

        return res.status(404).json(result)

    })

    router.post('/login', async (req, res) =>{
        
        const{correo, contrasena} = req.body
        const result = await authServices.login(correo, contrasena)

        let date = new Date().setDate(new Date().getDate()+7)

        if(result.success){
            return res.cookie("token", result.token,{
                httpOnly:true,
                sameSite: "none",
                expires: new Date(date),
                secure: true
            }).status(200)
            .json({nombre:result.usuario.nombre, rol:result.usuario.rol})
        }

        return res.status(404).json(result)
    })

    router.post("/logout", (req, res)=>{
        const date= new Date(new Date()-1)

        return res.cookie("token", "",{
            httpOnly:true,
            sameSite: "none",
            expires: new Date(date),
            secure: true
        })
        .json({loggedOut:true})
    })
}

module.exports = auth