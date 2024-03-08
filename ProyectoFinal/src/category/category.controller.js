'use strict'

import Category from './category.model.js'
import { checkUpdate } from '../utils/validator.js'

export const test = (req, res)=>{
    return res.send({message: 'Function test is running | category'})
}

export const save = async(req, res)=>{
    try{   
        //Capturar la data
        let data = req.body
        //Crea la instancia de Category
        let category = new Category(data)
        await category.save()
        return res.send({message: 'Category saved succesfully'})
    }catch(err){
    console.error(err)
    return res.status(500).send({message: 'Error saving category', err})
 }
}


export const get = async(req, res)=>{
    try{
        let categories = await Category.find()
        return res.send({ categories })
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting categories'})
    }
}

export const update = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let updatedCategories = await Category.findOneAndUpdate(
                {_id: id},
                data,
                {new: true}
            )
        if(!updatedCategories) return res.status(401).send({message: 'Category not found, not updated'})
        return res.send({message: 'Categories updates succesfully', updatedCategories})
    }catch(err){
        console.error(err)
        if(err.keyValue.name) return res.status(400).send({message: `Name ${err.keyValue.name} is already taken`})
        return res.status(500).send({message: 'Error updating categories'})
    }
}

export const deleteA = async(req, res)=>{
    try{
        let { id } = req.params
        let deletedCategory = await Category.findOneAndDelete({_id: id})
        if(!deletedCategory) return res.status(404).send({message: 'Category not found, not deleted'})
        return res.send({message: `Category  ${deletedCategory} deleted succesfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting category'})
    }
}


export const search = async(req, res)=>{
    try{
        //Obtener el parámetros de búsqueda
        let {search} = req.body
        //Buscar
        let categories = await Category.find(
            {name: search}
        ).populate('keeper', ['name', 'description'])
        //Validar la respuesta
        if(categories.length == 0) return res.status(404).send({message: 'Categories not found'})
        //Responder si todo sale bien
        return res.send({message: 'Categories found', categories})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error searching categories'})
    }
}
