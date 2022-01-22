
const {PeliculasModel, peliculasSchemaJoi} = require('../schemas/peliculas')

const peliculas = new PeliculasModel({name:"pelicula"})

class Peliculas{

    async getPeliculas(){
        try{
            const result = PeliculasModel.find()
            return result ||[]
        }
        catch(error){
            console.log(error)
        }
    }

    async getPeliculaByUser(idUsuario){
        const peliculasUser = await PeliculasModel.find({idUsuario})

        return peliculasUser || {}
    }

    async getPeliculasByGenero(genero){
        const peliculasByGenero = await PeliculasModel.find({genero})
        console.log(peliculasByGenero)
        return peliculasByGenero || {}
    }

    async getPeliculasByNombre(nombre){
        const peliculasByNombre = await PeliculasModel.find({nombre})

        return peliculasByNombre || {}
    }

    async getPeliculasByEstreno(estreno){
        const peliculasByEstreno = await PeliculasModel.find({estreno})

        return peliculasByEstreno || {}
    }


    async getPelicula(id){
        const result = await PeliculasModel.findById(id)
        
        return result || {"message": "Pelicula no encontrada"}

    }

    async createPelicula(data){
        const validacion = peliculasSchemaJoi.validate(data)

        if(!validacion.error){
            const peliculaGuardada = await PeliculasModel.create(data)

            return{data: peliculaGuardada, success: true, message: "Pelicula Creada Exitosamente"}
        }

        return{data: validacion.value, success: false, message:validacion.error.details[0].message}

    }

    async updatePelicula(id, data, usuario){

        const pelicula = await this.getPelicula(id)

        if(pelicula.idUsuario === usuario.id || usuario.rol === "admin"){
            const peliculaActualizada = await PeliculasModel.findByIdAndUpdate(id, data)

            return{update: true, pelicula: peliculaActualizada, message: "El producto se ha actualizado Correctamente"}
        } 

        return {update:false, message:"No tienes los permiso para actualizar el producto"}
    }


    async deletePelicula(id){
        const peliculaEliminada = await PeliculasModel.findByIdAndDelete(id)

        return peliculaEliminada || {}
    }
}

module.exports = Peliculas