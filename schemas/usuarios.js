const  {mongoose}= require("../config/db")
const Joi = require("joi")
const  {Schema} = mongoose

const usuarioSchema = new Schema (
    {
        nombre: String,
        username: String,
        correo: String,
        contrasena: String,
        rol: String,
        provider: String
    }
)

const usuarioSchemaJoi = Joi.object({
    nombre: Joi.string().required().max(200).message("El nombre es requerido y menor a 200"),
    username: Joi.string().required().max(50).message("El username es requerido y menor a 50"),
    correo: Joi.string().email().required().max(200).message("El email debe de ser valido"),
    contrasena: Joi.string().min(8).alphanum().required(),
    rol: Joi.string(),
    provider: Joi.string().required()
}
)

const UsuariModel = mongoose.model("Usuarios", usuarioSchema)
module.exports = { UsuariModel, usuarioSchemaJoi}