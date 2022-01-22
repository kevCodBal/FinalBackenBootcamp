const  {mongoose}= require("../config/db")
const Joi = require("joi")
const  {Schema} = mongoose


const peliculaSchema= new Schema({

    titulo: String,
    director: String,
    descripcion: String,
    estreno: Number,
    nominaciones: String,
    genero: String,
    elenco: String,
    idUsuario: String,
    img: String
})

const peliculasSchemaJoi = Joi.object(
    {
        titulo: Joi.string().required().max(100).message("Titulo Requerido"),
        director: Joi.string().required(),
        descripcion: Joi.string().required().max(300).message("Descripcion requerida"),
        estreno: Joi.number().required(),
        nominaciones: Joi.string(),
        genero: Joi.string().required().max(50).message("Se requiere el genero"),
        elenco: Joi.string().max(150),
        idUsuario: Joi.string(),
        img: Joi.string().required()
        
    }
)

const PeliculasModel = mongoose.model("Peliculas", peliculaSchema)

module.exports = {PeliculasModel, peliculasSchemaJoi}