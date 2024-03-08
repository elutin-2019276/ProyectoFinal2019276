//Ejecutar servicios
import { initServer } from './configs/app.js'
import { connect } from './configs/Mongo.js'

initServer()
connect()