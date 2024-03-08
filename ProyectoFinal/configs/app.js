//Configuración de Express

//Importaciones con los módulos
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import productRoutes from '../src/products/product.routes.js'

//Configuraciones
const app = express() //Crea una instancia de Express para el servidor.
//Configura las variables de entorno.
config() 
//Establece el puerto del servidor.
const port  = process.env.PORT || 3200 

//Configurar el servidor de Express
app.use(express.urlencoded({extended: false})) //Middleware para analizar cuerpos codificados en URL
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev')) 

//Declaración de rutas
app.use(userRoutes)
app.use('/categoria', categoryRoutes)
app.use('/producto', productRoutes)

//Levantar el servidor
export const initServer = ()=>{
    //Inicia el servidor Express al puerto.
    app.listen(port) 
    //Muestra un mensaje de éxito.
    console.log(`Server HTTP running in port ${port}`)
}


