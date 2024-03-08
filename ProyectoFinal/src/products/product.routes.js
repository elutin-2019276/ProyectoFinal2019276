 'use strict'

import { Router } from 'express'

import{
    save, 
    test,
} from './product.controller.js'

import {
    validateJwt,
    isAdmin
} from '../middlewares/validate-jwt.js'



const api = Router()

//ROLE ADMIN
api.post('/save', [validateJwt, isAdmin], save)

//ROLE CLIENT/ADMIN

api.get('test', test)


export default api
