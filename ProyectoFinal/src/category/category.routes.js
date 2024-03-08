'use strict'

import { Router } from 'express'

import{
    deleteA,
    get,
    save,
    test,
    update
} from './category.controller.js'

import {
    validateJwt,
    isAdmin
} from '../middlewares/validate-jwt.js'

const api = Router()

//ROLE ADMIN
api.post('/save', [validateJwt, isAdmin], save)
api.put('/update/:id', [validateJwt, isAdmin], update)
api.delete('/delete/:id', [validateJwt, isAdmin], deleteA)

//ROLE CLIENT/ADMIN
api.get('/get', [validateJwt], get)


api.get('/test', test)

export default api