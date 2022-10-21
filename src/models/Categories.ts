import { Schema, model } from 'mongoose'
import { CategoriesTypes } from '../types'


const schema = new Schema<CategoriesTypes>({
    name: String,
    slug: String
})
const modalName: string = 'Categories'
export default model<CategoriesTypes>(modalName, schema)