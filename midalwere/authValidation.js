const jwt = require("jsonwebtoken")
const config = require('../config')

const obtnerRol = (token, validacion, req, res, next)=>{

    if(!token){
        return res.status(403).json({message:"Se necesita un Token"})
    }

    try{
        const decodeToken = jwt.verify(token, config.jwt_secret)
        const {rol}= decodeToken

        if(validacion === "regular"){
            req.usuario = decodeToken
            return next()
        }else if(validacion === "editor" && (rol==="admin" || rol ==="editor")){
            req.usuario = decodeToken
            return next()
        }else if(validacion === "admin" && rol === "admin"){
            req.usuario = decodeToken
            return next()
        }
    }catch(error){
        return res.status(403).json({message:"Token Invalido"})

    }

    return res.status(403).json({message:"No cuenta con permisos suficientes"})
}

const verifyToken = (req, res, next) =>{
    const {token} = req.cookies

    return obtnerRol(token, "regular", req, res, next)

}

const verifyTokenEditor = (req, res, next) =>{
    const {token} = req.cookies

    return obtnerRol(token, "editor", req, res, next)

}

const verifyTokenAdmin = (req, res, next) =>{
    const {token} = req.cookies

    return obtnerRol(token, "admin", req, res, next)

}

module.exports= {verifyToken, verifyTokenEditor, verifyTokenAdmin}