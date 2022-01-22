const  {mongoose}= require("../config/db")
const Joi = require("joi")
const  {Schema} = mongoose


const resenaSchema = new Schema(
    {
        descripcion: String,
        fechaCreacion: Date,
        userCreacion: String,
        calificacion: Number,
        idPelicula: String
    }
)

const resenaSchemaJoi =  Joi.object(
    {
        descripcion: Joi.string().required().max(300).message("La descripcion es requerida"),
        fechaCreacion: Joi.date().required(),
        userCreacion: Joi.string(),
        calificacion: Joi.number().required(),
        idPelicula: Joi.string().required()
    }
)

const ResenaModel = mongoose.model("resena", resenaSchema)
module.exports = {ResenaModel, resenaSchemaJoi}