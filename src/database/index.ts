import { connect } from "mongoose";
import * as dotenv from 'dotenv'

dotenv.config()
export const connectmgdb = async () => {

    try {
        console.log("sucesso ao connectar com mongodb")
        await connect(process.env.DATABASE as string)
    } catch (e) {
        console.log("erro ao se conectar com mongodb" + e)
    }
}