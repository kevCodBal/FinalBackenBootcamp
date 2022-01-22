const {UsuariModel, usuarioSchemaJoi}= require ("../schemas/usuarios")
const usuario = new UsuariModel({name:"usuario"})

class Usuarios{


    async getUsers(){
        try{
            const usuariosget = await UsuariModel.find()
            return usuariosget || []
        }
        catch(error){
            console.log(error)
        }
    }

    async validateUser(data){
        const validacion = usuarioSchemaJoi.validate(data)

        if(validacion.error){
            return{ data: validacion.value, success:false, message: validacion.error.details[0].message}
        }

        const usuarioExiste = await this.getUser(data.correo)

        if(usuarioExiste){
            return{ data: validacion.value, success:false , message:"El correo ya esta en uso"}
        }

        return {data:validacion.value, success:true, message:"Datos Validados correctamente"}
    }

    async getUser(correo){
        const usuario = await UsuariModel.findOne({correo}).exec()

        return usuario || false
    }

    async createUser(data){
        const usuarioGuardado = await UsuariModel.create(data)

            return {data: usuarioGuardado, success:true, message:"Usuario creado Exitosamente"}
        
    }

    async updateUser(id, data) {
        const usuarioActualizado = await UsuariModel.findByIdAndUpdate(id, data)

        if(usuarioActualizado){
            return {data: usuarioActualizado, success: true, message:"Usuario actualizado correctamente"}
        }else{
            return {data: usuarioActualizado, success: false, message:"Usuario no actualizado"}
        }
        
    }

    async deleteUser(id){
        const usuarioEliminado = await UsuariModel.findByIdAndDelete(id)

        if(usuarioEliminado){
            return {data: usuarioEliminado, success: true, message:"Usuario eliminado exitosamente"}
        }else{
            return {data: usuarioEliminado, success: false, message:"Usuario no eliminado"}
        }
    }
}

module.exports = Usuarios