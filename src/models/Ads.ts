import { Schema, model } from 'mongoose'
import { AdTypes } from '../types'


const schema = new Schema<AdTypes>({
    idUser: String,
    imgs: [Object],
    category: String,
    price: Number,
    priceNegocible: Boolean,
    description: String,
    views: Number,
    status: String,
    state: String,
    title: String,
    dateCreated: Date

})
const modalName: string = 'ads'
export default model<AdTypes>(modalName, schema)