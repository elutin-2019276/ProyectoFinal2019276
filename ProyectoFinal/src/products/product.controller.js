'use strict'
import Product from './product.model.js'

export const test = (req, res)=>{
    return res.send('Hello world')
}

export const save = async(req, res)=>{
    try{
        let data = req.body
        let product = new Product(data)
        await product.save()
        return res.send({message: 'Product saved succesfully'})  
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error saving product', err})
    }
} 

