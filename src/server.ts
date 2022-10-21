import * as dotenv from 'dotenv'
import express, { urlencoded, Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import { connectmgdb } from './database'
dotenv.config()
connectmgdb()
import Routes from './routes/index'
const server = express()

server.use(cors())
server.use(express.json())
server.use(urlencoded({ extended: true }))
server.use(fileUpload())
server.use(express.static(__dirname + '/public'))
server.use('/', Routes)

server.listen(process.env.PORT, () => {
    console.log("Serve rodando na porta " + process.env.PORT)
})