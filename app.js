import express from 'express'
import cors from 'cors'
import { create } from 'express-handlebars'
import fileUpload from 'express-fileupload';
import 'dotenv/config';
import { sequelize } from './db/db.js'

import * as path from 'path'
import { fileURLToPath } from 'url'

import './models/Users.model.js'
import './models/Cars.model.js'

// -------------------------------------------------
// ------------------- RUTAS -----------------------
// -------------------------------------------------

import viewsRoutes from './routes/views.routes.js'
import carRoutes from './routes/car.routes.js'
import userRoutes from './routes/user.routes.js'
import { chargeSeeds } from './seeds.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

// -------------------------------------------------
// ------------------- MIDLEWARE -------------------
// -------------------------------------------------
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use(fileUpload({
	limits: { fileSize: 5 * 1024 * 1024 },
	abortOnLimit: true,
	responseOnLimit: "las imágenes no pueden superar los 3mb."
}));

// -------------------------------------------------
// ------------------- SERVIDOR --------------------
// -------------------------------------------------
app.use(viewsRoutes)
app.use('/api/v1', carRoutes)
app.use('/api/v1', userRoutes)

// app.listen(3000, () => { console.log('Servidor en http://localhost:3000') })
// CARPETA DE IMAGENES PUBLIC
app.use('/imagen', express.static(__dirname + '/public/img'))
// -------------------------------------------------
// ------------------- HANDLEBARS-------------------
// -------------------------------------------------

const hbs = create({
  partialsDir: [
    'views/partials/'
  ]
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

const main = async () => {
  try {
    await sequelize.authenticate()
    
    let force = false

    await sequelize.sync({
      force,
      alter: true,
      logging: false
    })

    if (force) {
      console.log('carga semillas');
      chargeSeeds();  
    }

    app.listen(process.env.PORT_FRONTEND, () => { console.log('Servidor http://localhost:'+process.env.PORT_FRONTEND);})
  } catch (error) {
    console.log('Ha ocurrido un error',error);
  }
}

main();

export default app