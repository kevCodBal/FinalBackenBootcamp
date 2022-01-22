const {ResenaModel, resenaSchemaJoi} = require('../schemas/resenas')
const resena= new ResenaModel({name: "resena"})

class Resena{
    
    async getResenasofMovie(idPelicula){
        
        try{
            const result = await ResenaModel.find({idPelicula})
            return result || []
        }catch(error){
            console.log(error)
        }
    }

    

    async createResenaMovie(data){
        const validacion = resenaSchemaJoi.validate(data)

        if(!validacion.error){
            const resenaGuardada = await ResenaModel.create(data)

            return{data:resenaGuardada, success:true, message:"Resena creada exitosamente"}
        }
       
        return {data: validacion.value, success:false, message:validacion.error.details[0].message}
    }


    async deleteResena(id){
        
        const result = await ResenaModel.findByIdAndDelete(id)

        return {message:"Resena Eliminada"} || {message:"Resena y no eliminada"}
    }


    async getResena(id){
        const result = await ResenaModel.findById(id)

        return result || {}
    }



    async updateResena(id, data, usuario){
        const resena = await this.getResena(id)

        if(resena.userCreacion === usuario.username || usuario.rol === "admin"){

            const resenaActualizada = await ResenaModel.findByIdAndUpdate(id, data)

            return{update:true, resena:resenaActualizada, message:"La resena se actualizo correctamente"}
        }

            return{update:false, message:"No es tu resena"}
    }

    
}

module.exports = Resena