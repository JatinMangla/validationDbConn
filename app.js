const express =require("express");
const mongoose = require("mongoose")
const url ='mongodb://localhost:27017/users'

const app = express()
mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())

const alienRouter = require('../dbCon/router/user')
app.use('/user',alienRouter)

app.listen(9000, () => {
    console.log('Server started')
})
