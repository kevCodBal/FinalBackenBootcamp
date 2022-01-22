const mongoose = require("mongoose")
const config = require("./index")


async function connection(){
    
    const conn =await mongoose.connect(`mongodb+srv://kevin:${config.password}@holamundo.9wvzs.mongodb.net/apimovies?retryWrites=true&w=majority`)
    console.log("------MONGO CONECTED----", conn.connection.host)
}

module.exports ={connection, mongoose}