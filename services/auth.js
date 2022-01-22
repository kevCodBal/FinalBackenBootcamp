const jwt = require("jsonwebtoken")
const Usuario = require("./usuario")
const config = require("../config")
const brcrypt = require("bcrypt")

class Auth{
     
    usuarios = new Usuario()

    async hashPassword(password){
        const salt = await brcrypt.genSalt(10)
        const hash = await brcrypt.hash(password, salt)

        return hash
    }

    async registro(correo, contrasenaOriginal, nombre,username, rol,provider){
        
        const validation = await this.usuarios.validateUser({correo, contrasena:contrasenaOriginal, nombre, username, provider})

        if(validation.success){
            const contrasena = await this.hashPassword(contrasenaOriginal)
            const usuario = await this.usuarios.createUser({correo, contrasena, nombre, username,rol , provider})
               
            return usuario
        }

            return {success:false, ...validation}
    }

    async login(correo, contrasena){
        const usuario = await this.usuarios.getUser(correo)

        if(usuario){
            const contrasenaCorrecta = await brcrypt.compare(contrasena, usuario.contrasena)

            if(contrasenaCorrecta){

                const token = jwt.sign({correo, rol:usuario.rol, id:usuario.id, username:usuario.username}, config.jwt_secret,{
                    expiresIn:"1d"
                })
                return {token, usuario, success:true}
            }  
        }

        return {"message": "Credenciales Incorrectas", success:false}
    }

    async cambiaRol(id, rol){
        const usuario = await this.usuarios.updateUser(id, {rol})

        if(usuario){
            return {"message": "Usuario Actualizado", success:true, usuario}
        }

        return {"message": "Ocurrio Algun Error", usuario, success:false}
    }


}

module.exports = Auth