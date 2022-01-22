 const express = require('express');
 const usuarios = require('./router/usuario')
 const auth = require("./router/auth")
 const cookie = require('cookie-parser')
 const peliculas = require('./router/pelicula')
 const expressSession = require('express-session')
 const passport = require("passport")
 const resena = require('./router/resena')
 const cors = require('cors')

 //CONFIG
 const config = require ("./config")

 //DESTRUCTURING
 const {connection}= require("./config/db");


//MIDALWERE
const app = express()
app.use(cors({origin:["http://127.0.0.7:5500", "http://localhost:5500", "http://localhost:3000", "http://127.0.0.7:3000"], credentials:true}))
app.use(express.json())
app.use(cookie())
app.use(expressSession({
    secret:"Mi contrasena"
}))
app.use(passport.initialize())
app.use(passport.session())




//DBCONECCION
connection()



//ROUTERS
usuarios(app)
auth(app)
peliculas(app)
resena(app)



 //SERVIDOR
const server = app.listen(config.port)

process.on('unhandledRejection', (err, promise)=>{
    console.log('Error', err.message)
    server.close(()=> process.exit(1))
})