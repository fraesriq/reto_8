const express = require('express');
const {create} = require('express-handlebars');
require('dotenv').config(); //LEE Y CARGA LAS VARIABLES DE ENTORNO DEL ARCHIVO .env
const fileUpload = require('express-fileupload');
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//LIMITACION DE TAMAÑO DE ARCHIVOS

app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit: "las imágenes no pueden superar los 3mb."
}));


const {emisionToken, validarToken} = require('./middlewares/jwt.js');
const {uploadFile} = require('./middlewares/upload.js');



app.listen(3000, () => console.log('http://localhost:3000/'))

const hbs = create({
	partialsDir: [
		'views/partials/',
	],
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname+ '/views');


//rutas de vista
app.get("/", (req, res) => {
    res.render("home");
})

app.get("/login", (req, res) => {
    res.render("login", {
        layout: "secondary"
    });
})

app.get("/publicar", validarToken, (req, res) => {

    res.render("publicar", {
        email: req.usuario.email
    });
})

app.get("/perfil", validarToken, (req, res) => {

    res.render("perfil", {
        email: req.usuario.email
    });
})

//rutas de endpoint
app.post("/api/v1/login", emisionToken, (req, res) => {
    try {
        res.status(200).json({code: 200, token: req.token})
    } catch (error) {
        res.status(500).json({code: 500, message: "error interno del servidor"})
    } 
})


app.post("/api/v1/publicar", validarToken, uploadFile, (req, res) => {
    try {
        let { titulo, contenido } = req.body;
        // nombre de imagen para guardar en DB viene en req.imagen
        //LOGICA DE GUARDAR IMAGEN
        res.status(201).json({code: 201, message: "Imagen guardada correctamente - nombre: " + req.imagen})
    } catch (error) {
        res.status(500).json({code: 500, message: "error interno del servidor"})
    } 
})





