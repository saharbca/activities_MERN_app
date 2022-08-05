const express = require('express')
const app = express()

require('dotenv').config()
require('./config/connectDB')
app.use(express.json())
const cors=require('cors')
app.use(cors('http://localhost:3000'))
//Routes
app.use('/users',require('./routes/userRoute'))
app.listen(process.env.port,()=>console.log('listening on port ',process.env.port))


//app.use(express.static('./public'))