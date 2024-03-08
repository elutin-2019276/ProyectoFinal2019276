import mongoose, { model } from 'mongoose'

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        ref: 'category',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

export default mongoose.model('product', productSchema) 



