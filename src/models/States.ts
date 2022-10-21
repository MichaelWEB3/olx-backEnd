import { Schema, model } from 'mongoose'
import { StatesTypes } from '../types'


const schema = new Schema<StatesTypes>({
    name: String,
})
const modalName: string = 'states'
export default model<StatesTypes>(modalName, schema)