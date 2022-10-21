import { Schema, model } from 'mongoose'
import { UsersTypes } from '../types'


const schema = new Schema<UsersTypes>({
    name: String,
    email: String,
    passWord: String,
    token: String,
    state: String
})
const modalName: string = 'Users'
export default model<UsersTypes>(modalName, schema)