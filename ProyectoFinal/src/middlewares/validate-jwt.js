'use strict'

import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'

export const validateJwt = async(req, res, next)=>{
    try{
        //Obtiene la llava de acceso al token
        let secretKey = process.env.SECRET_KEY
        //Obtiene el token de los headers
        let { token } = req.headers
        //Verifica si tiene el token
        if(!token) return res.status(401).send({message: 'Unauthorized'})
        //Obtiene el uid que envió el token
        let { uid } = jwt.verify(token, secretKey)
        console.log(uid);
        //Valida si el usuario aún existe en la BD
        let user = await User.findOne({_id: uid})
        console.log(uid, typeof user)
        if(!user) return res.status(404).send({message:'User not found - Unauthorized'})
        //Ok del Middleware
        req.user = user
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Invalid token or expired'})
    }
}

export const isAdmin = async(req, res, next)=>{
    try{
        let {role, username} = req.user
        if(!role || role !== 'ADMIN') return res.status(403).send({message: `You dont have acces || username ${username}`})
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Unauthorized role'})
    }
}


